import { Request, Response } from "express";
import { prisma } from "../db/index.db";
import {
	productRentedSchema,
	productSchema,
	productSoldSchema,
	updateProductSchema,
} from "../lib/zod/product";
import { getCurrentUser } from "../services/user.service";
import { StatusCode } from "../utils";

export async function getAllProducts(req: Request, res: Response) {
	try {
		const products = await prisma.product.findMany();
		return res.status(StatusCode.Success).json(products);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "Products courses couldnt be fetched" });
	}
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
	const refined = productSchema.safeParse(raw);
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
		buyerId: body.buyerId,
		sellerId: body.sellerId,
	};
	const refined = productSoldSchema.safeParse(raw);
	if (refined.success) {
		try {
			const { productId, buyerId, sellerId } = refined.data;
			await prisma.productSold.create({
				data: {
					buyerId: buyerId,
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
		renterId: body.renterId,
		ownerId: body.ownerId,
		rentHourDuration: body.rentHourDuration,
	};
	const refined = productRentedSchema.safeParse(raw);
	if (refined.success) {
		try {
			const { productId, renterId, ownerId, rentHourDuration } = refined.data;
			await prisma.productRented.create({
				data: {
					productId: productId,
					renterId: renterId,
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
