import { prisma } from "@/db/index.db";
import {
	deleteProductSchema,
	productRentedSchema,
	productSchema,
	productTitleValidationSchema,
	updateProductSchema,
} from "@/lib/zod/product";
import { getProductbyID, isDurationExpired } from "@/services/product.service";
import { RentCompletion } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { userProcedure } from "./user.procedure";

export const validateProductTitle = userProcedure
	.input(productTitleValidationSchema)
	.mutation(({ input }) => {
		return { success: true, value: input.title };
	});

export const addProduct = userProcedure
	.input(productSchema)
	.mutation(async ({ ctx, input }) => {
		try {
			const { title, desc, categories, brandId, price, rentPerHour } = input;
			const user = ctx.user;
			await prisma.product.create({
				data: {
					title,
					ownerId: user.id,
					description: desc,
					brandId,
					price,
					rentPerHour,
					categories: {
						create: categories.map((item) => {
							return {
								category: {
									connect: {
										id: item,
									},
								},
							};
						}),
					},
				},
			});
			return { msg: "Product created successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be created",
			});
		}
	});

export const updateProduct = userProcedure
	.input(updateProductSchema)
	.mutation(async ({ input }) => {
		try {
			const {
				title,
				desc,
				categories,
				brandId,
				price,
				rentPerHour,
				productId,
				deletedAt,
			} = input;

			await prisma.$transaction(async (tx) => {
				await tx.categoriesOnProducts.deleteMany({
					where: {
						productProductId: productId,
						productDeletedAt: deletedAt,
					},
				});
				await tx.categoriesOnProducts.createMany({
					data: categories.map((item) => {
						return {
							categoryId: item,
							productProductId: productId,
							productDeletedAt: deletedAt,
						};
					}),
				});
				await tx.product.update({
					where: {
						productId_deletedAt: {
							productId: productId,
							deletedAt: deletedAt,
						},
					},
					data: {
						title,
						description: desc,
						brandId,
						price,
						rentPerHour,
					},
				});
			});

			return { msg: "Product updated successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be updated",
			});
		}
	});

export const deleteProduct = userProcedure
	.input(deleteProductSchema)
	.mutation(async ({ input }) => {
		try {
			const { productId, deletedAt } = input;

			await prisma.product.update({
				where: {
					productId_deletedAt: {
						productId: productId,
						deletedAt: deletedAt,
					},
				},
				data: {
					deletedAt: Date.now(),
				},
			});

			return { msg: "Product deleted successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be deleted",
			});
		}
	});

export const getListedProducts = userProcedure.query(async ({ ctx }) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				deletedAt: 0,
				NOT: {
					ownerId: ctx.user.id,
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					},
				},
				brand: true,
			},
		});
		return products;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Products couldnt be fetched",
		});
	}
});

export const getProductByID = userProcedure
	.input(z.object({ productId: z.string() }))
	.query(async ({ input }) => {
		try {
			const product = await prisma.product.findFirst({
				where: {
					productId: input.productId,
					deletedAt: 0,
				},
				include: {
					categories: {
						include: {
							category: true,
						},
					},
					brand: true,
				},
			});
			return product;
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be fetched",
			});
		}
	});

export const getUserProductByID = userProcedure
	.input(z.object({ productId: z.string() }))
	.query(async ({ input }) => {
		try {
			const product = await prisma.product.findFirst({
				where: {
					productId: input.productId,
				},
				include: {
					categories: {
						include: {
							category: true,
						},
					},
					brand: true,
				},
			});
			return product;
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be fetched",
			});
		}
	});

export const buyProduct = userProcedure
	.input(
		z.object({
			productId: z.string(),
		})
	)
	.mutation(async ({ input, ctx }) => {
		try {
			const product = await getProductbyID(input.productId);
			if (!product)
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Product is not available",
				});
			await prisma.$transaction(async (tx) => {
				const productSold = await tx.product.update({
					where: {
						productId_deletedAt: {
							productId: input.productId,
							deletedAt: 0,
						},
					},
					data: {
						deletedAt: Date.now(),
					},
				});
				await tx.purchase.create({
					data: {
						buyerId: ctx.user.id,
						productProductId: input.productId,
						productDeletedAt: productSold.deletedAt,
					},
				});
			});
			return { msg: "Product bought successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be bought",
			});
		}
	});

export const rentProduct = userProcedure
	.input(productRentedSchema)
	.mutation(({ input, ctx }) => {
		const { productId, hours } = input;
		try {
			prisma.$transaction(async (tx) => {
				const product = await tx.product.update({
					where: {
						productId_deletedAt: {
							productId: productId,
							deletedAt: 0,
						},
					},
					data: {
						deletedAt: Date.now(),
					},
				});
				await tx.rental.create({
					data: {
						productProductId: productId,
						productDeletedAt: product.deletedAt,
						renterId: ctx.user.id,
						hours: hours,
						completion: RentCompletion.INCOMPLETE,
					},
				});
			});

			return { msg: "Product rented successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product couldnt be rented",
			});
		}
	});

export const increaseViewCount = userProcedure
	.input(
		z.object({
			id: z.string(),
		})
	)
	.mutation(async ({ input }) => {
		try {
			await prisma.product.update({
				where: {
					productId_deletedAt: {
						productId: input.id,
						deletedAt: 0,
					},
				},
				data: {
					viewCount: { increment: 1 },
				},
			});
			return { msg: "Product view incremented successfully" };
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Product view couldnt be incremented",
			});
		}
	});

export const processRentCompletion = userProcedure.query(() => {
	try {
		prisma.$transaction(async (tx) => {
			const rentalsIncompleted = await tx.rental.findMany({
				where: { completion: RentCompletion.INCOMPLETE },
				include: {
					product: true,
				},
			});
			await Promise.all(
				rentalsIncompleted.map(async (item) => {
					await tx.rental.updateMany({
						where: {
							id: item.id,
						},
						data: {
							completion: isDurationExpired(item.startsAt, item.hours)
								? RentCompletion.COMPLETE
								: RentCompletion.INCOMPLETE,
						},
					});
					await tx.product.updateMany({
						where: {
							rentals: {
								some: {
									id: item.id,
								},
							},
						},
						data: {
							deletedAt: isDurationExpired(item.startsAt, item.hours)
								? 0
								: item.product.deletedAt,
						},
					});
				})
			);
		});
		return { msg: "Rent completion done!" };
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Rent completion couldnt be processed",
		});
	}
});

export const getBrands = userProcedure.query(async () => {
	try {
		const brands = await prisma.brand.findMany({});
		return brands;
	} catch (error) {
		console.error(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Brands couldnt be fetched",
		});
	}
});

export const getCategories = userProcedure.query(async () => {
	try {
		const categories = await prisma.category.findMany({});
		return categories;
	} catch (error) {
		console.error(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "Categories couldnt be fetched",
		});
	}
});
