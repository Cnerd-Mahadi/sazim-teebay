import {
	addProduct,
	getBrands,
	getCategories,
	getListedProducts,
	getProductByID,
	increaseViewCount,
	updateProduct,
	validateProductTitle,
} from "@/procedures/product.procedure";
import {
	getProductsByUser,
	signInUser,
	signUpUser,
} from "@/procedures/user.procedure";
import { router } from "@/trpc";

export const userRouter = router({
	signUp: signUpUser,
	signIn: signInUser,
	productsUser: getProductsByUser,
	// productsBought:
	// productsSold:
	// productsRented:
	// productsLent:
	// test: test,
});
export const productRouter = router({
	brands: getBrands,
	categories: getCategories,
	productsListed: getListedProducts,
	product: getProductByID,
	validateProductTitle: validateProductTitle,
	addProduct: addProduct,
	updateProduct: updateProduct,
	// deleteProduct:
	// buyProduct:
	// rentProduct:
	incrementView: increaseViewCount,
});

export const appRouter = router({
	user: userRouter,
	product: productRouter,
});

export type AppRouter = typeof appRouter;

// TRPC endpoint API structure example -> user.getSomething
