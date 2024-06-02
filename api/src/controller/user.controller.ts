import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../db/index.db";
import { userSchema } from "../lib/zod/user";
import { getToken } from "../services/auth.service";
import { getCurrentUser, getUserbyEmail } from "../services/user.service";
import { StatusCode, checkHashedPassword, getHashedPassword } from "../utils";

export async function signUpUser(req: Request, res: Response) {
	const body = req.body;
	const raw = {
		fname: body.fname,
		lname: body.lname,
		address: body.address,
		phone: body.phone,
		email: body.email,
		password: body.password,
	};
	const refined = userSchema.safeParse(raw);
	if (refined.success) {
		try {
			const { fname, lname, address, phone, email, password } = refined.data;
			const hashedPassword = await getHashedPassword(password);
			prisma.$transaction(async (tx) => {
				const profile = await tx.profile.create({
					data: {
						fname: fname,
						lname: lname,
						address: address,
						phone: phone,
					},
				});
				await tx.user.create({
					data: {
						id: profile.id,
						email: email,
						password: hashedPassword,
						profileId: profile.id,
					},
				});
			});
			return res
				.status(StatusCode.Success)
				.json({ msg: "User created successfully" });
		} catch (error) {
			console.error(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: "User couldnt be created" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
		error: refined.error,
	});
}

export async function signInUser(req: Request, res: Response) {
	const parseUser = z.string();
	const refinedEmail = parseUser.safeParse(req.body.email);
	const refinedPassword = parseUser.safeParse(req.body.password);

	if (refinedEmail.success && refinedPassword.success) {
		const user = await getUserbyEmail(refinedEmail.data);
		if (user) {
			const checkPass = await checkHashedPassword(
				refinedPassword.data,
				user.password
			);
			if (checkPass) {
				const token = getToken(user.email);
				return res.status(StatusCode.Success).json({ token: token });
			}
			return res.status(StatusCode.Unauthorized).json({
				msg: "Invalid creds",
			});
		}
		return res.status(StatusCode.Unauthorized).json({
			msg: "Invalid creds",
		});
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
	});
}

export async function getProductsByUser(req: Request, res: Response) {
	const user = await getCurrentUser(req.headers.authorization);
	try {
		const userProducts = await prisma.product.findMany({
			where: {
				ownerId: user.id,
			},
		});
		return res.status(StatusCode.Success).json(userProducts);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "User products couldnt be fetched" });
	}
}

export async function getProductsSoldByUser(req: Request, res: Response) {
	const user = await getCurrentUser(req.headers.authorization);
	try {
		const userProductsSold = await prisma.productSold.findMany({
			where: {
				sellerId: user.id,
			},
			include: {
				product: true,
			},
		});
		return res.status(StatusCode.Success).json(userProductsSold);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "User products sold couldnt be fetched" });
	}
}

export async function getProductsBoughtByUser(req: Request, res: Response) {
	const user = await getCurrentUser(req.headers.authorization);
	try {
		const userProductsBought = await prisma.productSold.findMany({
			where: {
				buyerId: user.id,
			},
			include: {
				product: true,
			},
		});
		return res.status(StatusCode.Success).json(userProductsBought);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "User products bought couldnt be fetched" });
	}
}

export async function getProductsRentedtByUser(req: Request, res: Response) {
	const user = await getCurrentUser(req.headers.authorization);
	try {
		const userProductsRented = await prisma.productRented.findMany({
			where: {
				renterId: user.id,
			},
			include: {
				product: true,
			},
		});
		return res.status(StatusCode.Success).json(userProductsRented);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "User products rented couldnt be fetched" });
	}
}

export async function getProductsLentByUser(req: Request, res: Response) {
	const user = await getCurrentUser(req.headers.authorization);
	try {
		const userProductsLent = await prisma.productRented.findMany({
			where: {
				ownerId: user.id,
			},
			include: {
				product: true,
			},
		});
		return res.status(StatusCode.Success).json(userProductsLent);
	} catch (error) {
		console.log(error);
		return res
			.status(StatusCode.ServerError)
			.json({ msg: "User products lent couldnt be fetched" });
	}
}

export async function deleteProduct(req: Request, res: Response) {
	const parseProductId = z.string();
	const refinedProductId = parseProductId.safeParse(req.params.productId);
	if (refinedProductId.success) {
		try {
			await prisma.product.delete({
				where: {
					id: refinedProductId.data,
				},
			});
			return res
				.status(StatusCode.Success)
				.json({ msg: "User product deleted successfully" });
		} catch (error) {
			console.log(error);
			return res
				.status(StatusCode.ServerError)
				.json({ msg: "User product couldnt be deleted deleted" });
		}
	}
	return res.status(StatusCode.Invalid).json({
		msg: "Invalid data",
	});
}
