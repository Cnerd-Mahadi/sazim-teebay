import { z } from "zod";

export const productSchema = z.object({
	title: z.string(),
	desc: z.string().min(20),
	categories: z.string().array(),
	brandId: z.string(),
	price: z.number().int(),
	rentPerHour: z.number().int(),
	showDay: z.boolean(),
});

export const updateProductSchema = productSchema.extend({
	productId: z.string(),
});

export const productSoldSchema = z.object({
	productId: z.string(),
	buyerId: z.string(),
	sellerId: z.string(),
});

export const productRentedSchema = z.object({
	productId: z.string(),
	renterId: z.string(),
	ownerId: z.string(),
	rentHourDuration: z.number().int(),
});
