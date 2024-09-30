import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";

export const updateProductFormSchema = productFormSchema;
// .omit({ brandId: true })
// .extend({
// 	categories: z
// 		.array(
// 			z.object({
// 				id: z.string(),
// 				type: z.string(),
// 			})
// 		)
// 		.min(1),
// 	brand: z
// 		.object({
// 			id: z.string(),
// 			name: z.string(),
// 		})
// 		.required(),
// });

// export const productSchema = productFormSchema.extend({
// 	id: z.string(),
// 	ownerId: z.string(),
// 	viewCount: z.number(),
// 	showDay: z.boolean(),
// 	createdAt: z.string(),
// 	categories: z.array(
// 		z.object({
// 			category: z.object({
// 				id: z.string(),
// 				type: z.string(),
// 			}),
// 		})
// 	),
// 	brand: z.object({
// 		id: z.string(),
// 		name: z.string(),
// 	}),
// });

export const brandSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const categorySchema = z.object({
	id: z.string(),
	type: z.string(),
});
