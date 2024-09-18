import { z } from "zod";
import { checkUniqueTitle } from "../../services/product.service";

export const productSchema = z.object({
	title: z
		.string()
		.min(3)
		.refine(
			async (value) => {
				const isUnique = await checkUniqueTitle(value);
				console.log(value, isUnique);
				return isUnique;
			},
			{ message: "Title already exist" }
		),
	desc: z.string().min(20),
	categories: z.string().array(),
	brandId: z.string(),
	price: z.number().int().gt(100),
	rentPerHour: z.number().int().gt(10),
	showDay: z.boolean(),
});

export const updateProductSchema = productSchema.extend({
	productId: z.string(),
});

export const productSoldSchema = z.object({
	productId: z.string(),
	sellerId: z.string(),
});

export const productRentedSchema = z.object({
	productId: z.string(),
	ownerId: z.string(),
	rentHourDuration: z.number().int(),
});
