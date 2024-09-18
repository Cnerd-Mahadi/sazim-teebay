import { router } from "../trpc";
import { signInUser, signUpUser } from "./../procedures/user.procedure";

export const userRouter = router({
	signUp: signUpUser,
	signIn: signInUser,
	// productsUser:
	// productsBought:
	// productsSold:
	// productsRented:
	// productsLent:
	// test: test,
});
export const productRouter = router({
	// brands:
	// categories:
	// productsListed:
	// product:
	// addProduct:
	// editProduct:
	// deleteProduct:
	// buyProduct:
	// rentProduct:
	// incrementView:
});

export const appRouter = router({
	user: userRouter,
	product: productRouter,
});

export type AppRouter = typeof appRouter;

// TRPC endpoint API structure example -> user.getSomething
