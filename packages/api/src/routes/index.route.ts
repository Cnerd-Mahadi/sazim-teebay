import {
	addProduct,
	buyProduct,
	deleteProduct,
	getBrands,
	getCategories,
	getListedProducts,
	getProductByID,
	getUserProductByID,
	increaseViewCount,
	processRentCompletion,
	rentProduct,
	updateProduct,
	validateProductTitle,
} from "@/procedures/product.procedure";
import {
	getProductsBoughtByUser,
	getProductsByUser,
	getProductsLentByUser,
	getProductsRentedByUser,
	getProductsSoldByUser,
	signInUser,
	signUpUser,
} from "@/procedures/user.procedure";
import { router } from "@/trpc";

export const userRouter = router({
	signUp: signUpUser,
	signIn: signInUser,
	productsUser: getProductsByUser,
	productsBought: getProductsBoughtByUser,
	productsSold: getProductsSoldByUser,
	productsRented: getProductsRentedByUser,
	productsLent: getProductsLentByUser,
});
export const productRouter = router({
	brands: getBrands,
	categories: getCategories,
	productsListed: getListedProducts,
	product: getProductByID,
	userProduct: getUserProductByID,
	validateProductTitle: validateProductTitle,
	addProduct: addProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	buyProduct: buyProduct,
	rentProduct: rentProduct,
	rentCompletion: processRentCompletion,
	incrementView: increaseViewCount,
});

export const appRouter = router({
	user: userRouter,
	product: productRouter,
});

export type AppRouter = typeof appRouter;
