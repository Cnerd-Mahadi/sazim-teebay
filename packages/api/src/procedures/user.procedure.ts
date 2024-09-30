import { prisma } from "@/db/index.db";
import { credSchema, signUpSchema } from "@/lib/zod/user";
import { authedMiddleware } from "@/middlewares/index.middleware";
import { getToken } from "@/services/auth.service";
import { getCurrentUser } from "@/services/user.service";
import { getHashedPassword } from "@/utils";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "./../trpc";

export const userProcedure = publicProcedure.use(authedMiddleware);

export const signUpUser = publicProcedure
	.input(signUpSchema)
	.mutation(async ({ input }) => {
		try {
			const {
				fname,
				lname,
				address,
				dob: dobString,
				phone,
				email,
				password,
			} = input;
			const hashedPassword = await getHashedPassword(password);
			const dob = new Date(dobString);
			prisma.$transaction(async (tx) => {
				const user = await tx.user.create({
					data: {
						email: email,
						password: hashedPassword,
					},
				});
				await tx.profile.create({
					data: {
						fname: fname,
						lname: lname,
						dob: dob,
						address: address,
						phone: phone,
						userId: user.id,
					},
				});
			});
			return {
				success: "User created successfully",
			};
		} catch (error) {
			console.error(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "User couldnt be created",
			});
		}
	});

export const signInUser = publicProcedure
	.input(credSchema)
	.mutation(async ({ input }) => {
		try {
			const token = getToken(input.email);
			const user = await getCurrentUser(token);
			return { token: token, user: { id: user.id, email: user.email } };
		} catch (error) {
			console.log(error);
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "User couldnt be signed in",
			});
		}
	});

export const getProductsByUser = userProcedure.query(async ({ ctx }) => {
	try {
		const userProducts = await prisma.product.findMany({
			where: {
				ownerId: ctx.user.id,
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
		return userProducts;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "User products couldnt be fetched",
		});
	}
});

// export async function getProductsSoldByUser(req: Request, res: Response) {
// 	const user = await getCurrentUser(req.headers.authorization);
// 	try {
// 		const userProductsSold = await prisma.productSold.findMany({
// 			where: {
// 				sellerId: user.id,
// 			},
// 			include: {
// 				product: {
// 					include: {
// 						categories: {
// 							include: {
// 								category: true,
// 							},
// 						},
// 						brand: true,
// 					},
// 				},
// 			},
// 		});
// 		return res.status(StatusCode.Success).json(userProductsSold);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(StatusCode.ServerError)
// 			.json({ msg: "User products sold couldnt be fetched" });
// 	}
// }

// export async function getProductsBoughtByUser(req: Request, res: Response) {
// 	const user = await getCurrentUser(req.headers.authorization);
// 	try {
// 		const userProductsBought = await prisma.productSold.findMany({
// 			where: {
// 				buyerId: user.id,
// 			},
// 			include: {
// 				product: {
// 					include: {
// 						categories: {
// 							include: {
// 								category: true,
// 							},
// 						},
// 						brand: true,
// 					},
// 				},
// 			},
// 		});
// 		return res.status(StatusCode.Success).json(userProductsBought);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(StatusCode.ServerError)
// 			.json({ msg: "User products bought couldnt be fetched" });
// 	}
// }

// export async function getProductsRentedtByUser(req: Request, res: Response) {
// 	const user = await getCurrentUser(req.headers.authorization);
// 	try {
// 		const userProductsRented = await prisma.productRented.findMany({
// 			where: {
// 				renterId: user.id,
// 			},
// 			include: {
// 				product: {
// 					include: {
// 						categories: {
// 							include: {
// 								category: true,
// 							},
// 						},
// 						brand: true,
// 					},
// 				},
// 			},
// 		});
// 		return res.status(StatusCode.Success).json(userProductsRented);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(StatusCode.ServerError)
// 			.json({ msg: "User products rented couldnt be fetched" });
// 	}
// }

// export async function getProductsLentByUser(req: Request, res: Response) {
// 	const user = await getCurrentUser(req.headers.authorization);
// 	try {
// 		const userProductsLent = await prisma.productRented.findMany({
// 			where: {
// 				ownerId: user.id,
// 			},
// 			include: {
// 				product: {
// 					include: {
// 						categories: {
// 							include: {
// 								category: true,
// 							},
// 						},
// 						brand: true,
// 					},
// 				},
// 			},
// 		});
// 		return res.status(StatusCode.Success).json(userProductsLent);
// 	} catch (error) {
// 		console.log(error);
// 		return res
// 			.status(StatusCode.ServerError)
// 			.json({ msg: "User products lent couldnt be fetched" });
// 	}
// }

// export async function deleteProduct(req: Request, res: Response) {
// 	const parseProductId = z.string();
// 	const refinedProductId = parseProductId.safeParse(req.params.productId);
// 	if (refinedProductId.success) {
// 		try {
// 			await prisma.product.delete({
// 				where: {
// 					id: refinedProductId.data,
// 				},
// 			});
// 			return res
// 				.status(StatusCode.Success)
// 				.json({ msg: "User product deleted successfully" });
// 		} catch (error) {
// 			console.log(error);
// 			return res
// 				.status(StatusCode.ServerError)
// 				.json({ msg: "User product couldnt be deleted deleted" });
// 		}
// 	}
// 	return res.status(StatusCode.Invalid).json({
// 		msg: "Invalid data",
// 	});
// }
