import { prisma } from "@/db/index.db";
import {
	productSchema,
	productTitleValidationSchema,
	updateProductSchema,
} from "@/lib/zod/product";
import { ProductStatus } from "@prisma/client";
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
					productStatus: ProductStatus.AVAILABLE,
					viewCount: 0,
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
			} = input;

			await prisma.$transaction(async (tx) => {
				await tx.categoriesOnProducts.deleteMany({
					where: {
						productId: productId,
					},
				});
				await tx.categoriesOnProducts.createMany({
					data: categories.map((item) => {
						return {
							categoryId: item,
							productId: productId,
						};
					}),
				});
				await tx.product.update({
					where: {
						id: productId,
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

export const getListedProducts = userProcedure.query(async ({ ctx }) => {
	try {
		const products = await prisma.product.findMany({
			where: {
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
					id: input.productId,
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

// export async function editProduct(req: Request, res: Response) {
// 	const body = req.body;
// 	const raw = {
// 		title: body.title,
// 		desc: body.desc,
// 		categories: body.categories,
// 		brandId: body.brandId,
// 		price: body.price,
// 		rentPerHour: body.rentPerHour,
// 		showDay: body.showDay,
// 		productId: body.productId,
// 	};
// 	const refined = updateProductSchema.safeParse(raw);
// 	if (refined.success) {
// 		try {
// 			const {
// 				productId,
// 				title,
// 				desc,
// 				categories,
// 				brandId,
// 				price,
// 				rentPerHour,
// 				showDay,
// 			} = refined.data;
// 			await prisma.product.update({
// 				where: { id: productId },
// 				data: {
// 					title: {
// 						set: title,
// 					},
// 					desc: {
// 						set: desc,
// 					},
// 					brandId: {
// 						set: brandId,
// 					},
// 					price: {
// 						set: price,
// 					},
// 					rentPerHour: {
// 						set: rentPerHour,
// 					},
// 					showDay: {
// 						set: showDay,
// 					},
// 					categories: {
// 						deleteMany: {
// 							productId: productId,
// 						},
// 						create: categories.map((item) => {
// 							return {
// 								category: {
// 									connect: {
// 										id: item,
// 									},
// 								},
// 							};
// 						}),
// 					},
// 				},
// 			});
// 			return res
// 				.status(StatusCode.Success)
// 				.json({ msg: "Product updated successfully" });
// 		} catch (error) {
// 			console.error(error);
// 			return res
// 				.status(StatusCode.ServerError)
// 				.json({ msg: "Product couldnt be updated" });
// 		}
// 	}
// 	return res.status(StatusCode.Invalid).json({
// 		msg: "Invalid data",
// 		error: refined.error,
// 	});
// }

// export async function buyProduct(req: Request, res: Response) {
// 	const body = req.body;
// 	const raw = {
// 		productId: body.productId,
// 		sellerId: body.sellerId,
// 	};
// 	const refined = productSoldSchema.safeParse(raw);
// 	if (refined.success) {
// 		try {
// 			const user = await getCurrentUser(req.headers.authorization);
// 			const { productId, sellerId } = refined.data;
// 			await prisma.productSold.create({
// 				data: {
// 					buyerId: user.id,
// 					productId: productId,
// 					sellerId: sellerId,
// 				},
// 			});
// 			return res
// 				.status(StatusCode.Success)
// 				.json({ msg: "Product bought successfully" });
// 		} catch (error) {
// 			console.error(error);
// 			return res
// 				.status(StatusCode.ServerError)
// 				.json({ msg: " Product couldnt be bought" });
// 		}
// 	}
// 	return res.status(StatusCode.Invalid).json({
// 		msg: "Invalid data",
// 		error: refined.error,
// 	});
// }

// export async function rentProduct(req: Request, res: Response) {
// 	const body = req.body;
// 	const raw = {
// 		productId: body.productId,
// 		ownerId: body.ownerId,
// 		rentHourDuration: body.rentHourDuration,
// 	};
// 	const refined = productRentedSchema.safeParse(raw);
// 	if (refined.success) {
// 		try {
// 			const user = await getCurrentUser(req.headers.authorization);
// 			const { productId, ownerId, rentHourDuration } = refined.data;
// 			await prisma.productRented.create({
// 				data: {
// 					productId: productId,
// 					renterId: user.id,
// 					ownerId: ownerId,
// 					rentHourDuration: rentHourDuration,
// 				},
// 			});
// 			return res
// 				.status(StatusCode.Success)
// 				.json({ msg: "Product rented successfully" });
// 		} catch (error) {
// 			console.error(error);
// 			return res
// 				.status(StatusCode.ServerError)
// 				.json({ msg: " Product couldnt be rented" });
// 		}
// 	}
// 	return res.status(StatusCode.Invalid).json({
// 		msg: "Invalid data",
// 		error: refined.error,
// 	});
// }

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
					id: input.id,
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
