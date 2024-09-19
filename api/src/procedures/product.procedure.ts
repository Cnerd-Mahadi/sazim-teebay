import { prisma } from "@/db/index.db";
import {
	productRentedSchema,
	productSchema,
	productSoldSchema,
	updateProductSchema,
} from "@/lib/zod/product";
import { getCurrentUser } from "@/services/user.service";
import { StatusCode } from "@/utils";
import { Request, Response } from "express";
import { z } from "zod";

export async function getListedProducts(req: Request, res: Response) {
	try {
		const user = await getCurrentUser(req.headers.authorization);
		console.log(user);
		const products = await prisma.product.findMany({
			where: {
				NOT: {
					ownerId: user.id,
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
		return res.status(StatusCode.Success).json(products);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "Products couldnt be fetched" });
	}
}

export async function getProductByID(req: Request, res: Response) {
	const productId = z.string().safeParse(req.params.productId);
	if (productId.success) {
		try {
			const product = await prisma.product.findFirst({
				where: {
					id: productId.data,
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
			if (product) {
				return res.status(StatusCode.Success).json(product);
			}
			return res
				.status(StatusCode.Success)
				.json({ msg: " Product couldnt be found" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: " Product couldnt be fetched" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: productId.error,
	});
}

export async function addProduct(req: Request, res: Response) {
	const body = req.body;
	const raw = {
		title: body.title,
		desc: body.desc,
		categories: body.categories,
		brandId: body.brandId,
		price: body.price,
		rentPerHour: body.rentPerHour,
		showDay: body.showDay,
	};
	const refined = await productSchema.safeParseAsync(raw);
	if (refined.success) {
		try {
			const { title, desc, categories, brandId, price, rentPerHour, showDay } =
				refined.data;
			const user = await getCurrentUser(req.headers.authorization);
			const product = await prisma.product.create({
				data: {
					title,
					ownerId: user.id,
					desc,
					brandId,
					price,
					rentPerHour,
					viewCount: 0,
					showDay,
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
			return res
				.status(StatusCode.Success)
				.json({ msg: "Product created successfully" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: "Product couldnt be created" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: refined.error,
	});
}

export async function editProduct(req: Request, res: Response) {
	const body = req.body;
	const raw = {
		title: body.title,
		desc: body.desc,
		categories: body.categories,
		brandId: body.brandId,
		price: body.price,
		rentPerHour: body.rentPerHour,
		showDay: body.showDay,
		productId: body.productId,
	};
	const refined = updateProductSchema.safeParse(raw);
	if (refined.success) {
		try {
			const {
				productId,
				title,
				desc,
				categories,
				brandId,
				price,
				rentPerHour,
				showDay,
			} = refined.data;
			await prisma.product.update({
				where: { id: productId },
				data: {
					title: {
						set: title,
					},
					desc: {
						set: desc,
					},
					brandId: {
						set: brandId,
					},
					price: {
						set: price,
					},
					rentPerHour: {
						set: rentPerHour,
					},
					showDay: {
						set: showDay,
					},
					categories: {
						deleteMany: {
							productId: productId,
						},
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
			return res
				.status(StatusCode.Success)
				.json({ msg: "Product updated successfully" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: "Product couldnt be updated" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: refined.error,
	});
}

export async function buyProduct(req: Request, res: Response) {
	const body = req.body;
	const raw = {
		productId: body.productId,
		sellerId: body.sellerId,
	};
	const refined = productSoldSchema.safeParse(raw);
	if (refined.success) {
		try {
			const user = await getCurrentUser(req.headers.authorization);
			const { productId, sellerId } = refined.data;
			await prisma.productSold.create({
				data: {
					buyerId: user.id,
					productId: productId,
					sellerId: sellerId,
				},
			});
			return res
				.status(StatusCode.Success)
				.json({ msg: "Product bought successfully" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: " Product couldnt be bought" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: refined.error,
	});
}

export async function rentProduct(req: Request, res: Response) {
	const body = req.body;
	const raw = {
		productId: body.productId,
		ownerId: body.ownerId,
		rentHourDuration: body.rentHourDuration,
	};
	const refined = productRentedSchema.safeParse(raw);
	if (refined.success) {
		try {
			const user = await getCurrentUser(req.headers.authorization);
			const { productId, ownerId, rentHourDuration } = refined.data;
			await prisma.productRented.create({
				data: {
					productId: productId,
					renterId: user.id,
					ownerId: ownerId,
					rentHourDuration: rentHourDuration,
				},
			});
			return res
				.status(StatusCode.Success)
				.json({ msg: "Product rented successfully" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: " Product couldnt be rented" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: refined.error,
	});
}

export async function increaseViewCount(req: Request, res: Response) {
	const productId = z.string().safeParse(req.params.productId);
	if (productId.success) {
		try {
			const product = await prisma.product.findFirst({
				where: {
					id: productId.data,
				},
			});
			if (product) {
				await prisma.product.update({
					where: {
						id: productId.data,
					},
					data: {
						viewCount: { set: product.viewCount + 1 },
					},
				});
				return res
					.status(StatusCode.Success)
					.json({ msg: "Product view incremented successfully" });
			}
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: " Product view couldnt be incremented" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: productId.error,
	});
}

export async function getBrands(req: Request, res: Response) {
	try {
		const brands = await prisma.brand.findMany({});
		if (brands) {
			return res.status(StatusCode.Success).json(brands);
		}
		return res
			.status(StatusCode.Success)
			.json({ msg: "Brands couldnt be found" });
	} catch (error) {
		console.error(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "Brands couldnt be fetched" });
	}
}

export async function getCategories(req: Request, res: Response) {
	try {
		const categories = await prisma.category.findMany({});
		if (categories) {
			return res.status(StatusCode.Success).json(categories);
		}
		return res
			.status(StatusCode.Success)
			.json({ msg: "Categories couldnt be found" });
	} catch (error) {
		console.error(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "Categories couldnt be fetched" });
	}
}
