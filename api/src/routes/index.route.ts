import { Router } from "express";
import {
	addProduct,
	buyProduct,
	editProduct,
	getBrands,
	getCategories,
	getListedProducts,
	getProductByID,
	increaseViewCount,
	rentProduct,
} from "../controller/product.controller";
import {
	deleteProduct,
	getProductsBoughtByUser,
	getProductsByUser,
	getProductsLentByUser,
	getProductsRentedtByUser,
	getProductsSoldByUser,
	signInUser,
	signUpUser,
} from "../controller/user.controller";
import { authMiddleware } from "../middlewares/api.middleware";

export const router = Router();

//public
router.post("/signup", signUpUser);
router.post("/signin", signInUser);

//authed

router.get("/productsListed", authMiddleware, getListedProducts);
router.get("/brands", authMiddleware, getBrands);
router.get("/categories", authMiddleware, getCategories);
router.get("/product/:productId", authMiddleware, getProductByID);
router.post("/addProduct", authMiddleware, addProduct);
router.put("/editProduct", authMiddleware, editProduct);
router.post("/buyProduct", authMiddleware, buyProduct);
router.post("/rentProduct", authMiddleware, rentProduct);
router.get("/incrementView/:productId", authMiddleware, increaseViewCount);

router.get("/products", authMiddleware, getProductsByUser);
router.get("/productsBought", authMiddleware, getProductsBoughtByUser);
router.get("/productsSold", authMiddleware, getProductsSoldByUser);
router.get("/productsRented", authMiddleware, getProductsRentedtByUser);
router.get("/productsLent", authMiddleware, getProductsLentByUser);
router.delete("/:productId", authMiddleware, deleteProduct);
