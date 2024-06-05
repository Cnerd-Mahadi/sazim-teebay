import { z } from "zod";

export const productFormSchema = z.object({
	title: z.string().min(3),
	desc: z.string().min(20),
	categories: z.string().array().min(1),
	brandId: z.string().min(1),
	price: z.number().int().gt(100),
	rentPerHour: z.number().int().gt(10),
	showDay: z.number(),
});

export const productSchema = productFormSchema.extend({
	id: z.string(),
	ownerId: z.string(),
	viewCount: z.number(),
	showDay: z.boolean(),
	createdAt: z.string(),
	categories: z.array(
		z.object({
			category: z.object({
				id: z.string(),
				type: z.string(),
			}),
		})
	),
	brand: z.object({
		id: z.string(),
		name: z.string(),
	}),
});

export const brandSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const categorySchema = z.object({
	id: z.string(),
	type: z.string(),
});
