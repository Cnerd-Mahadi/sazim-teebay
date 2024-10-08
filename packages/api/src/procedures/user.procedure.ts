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

export const getProductsSoldByUser = userProcedure.query(async ({ ctx }) => {
	try {
		const userProductsSold = await prisma.purchase.findMany({
			where: {
				product: {
					ownerId: ctx.user.id,
				},
			},
			include: {
				product: {
					include: {
						categories: {
							include: {
								category: true,
							},
						},
						brand: true,
					},
				},
			},
		});
		return userProductsSold;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "User products sold couldnt be fetched",
		});
	}
});

export const getProductsBoughtByUser = userProcedure.query(async ({ ctx }) => {
	try {
		const userProductsBought = await prisma.purchase.findMany({
			where: {
				buyerId: ctx.user.id,
			},
			include: {
				product: {
					include: {
						categories: {
							include: {
								category: true,
							},
						},
						brand: true,
					},
				},
			},
		});
		return userProductsBought;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "User products bought couldnt be fetched",
		});
	}
});

export const getProductsRentedByUser = userProcedure.query(async ({ ctx }) => {
	try {
		const userProductsRented = await prisma.rental.findMany({
			where: {
				renterId: ctx.user.id,
			},
			include: {
				product: {
					include: {
						categories: {
							include: {
								category: true,
							},
						},
						brand: true,
					},
				},
			},
		});
		return userProductsRented;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "User products rented couldnt be fetched",
		});
	}
});

export const getProductsLentByUser = userProcedure.query(async ({ ctx }) => {
	try {
		const userProductsLent = await prisma.rental.findMany({
			where: {
				product: {
					ownerId: ctx.user.id,
				},
			},
			include: {
				product: {
					include: {
						categories: {
							include: {
								category: true,
							},
						},
						brand: true,
					},
				},
			},
		});
		return userProductsLent;
	} catch (error) {
		console.log(error);
		throw new TRPCError({
			code: "INTERNAL_SERVER_ERROR",
			message: "User products lent couldnt be fetched",
		});
	}
});
