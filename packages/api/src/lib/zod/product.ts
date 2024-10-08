import {
	checkUniqueTitle,
	checkUniqueTitleUpdated,
} from "@/services/product.service";
import { validationType } from "teebay-common/src";
import { productFormSchema } from "teebay-common/src/zod/index";
import { z } from "zod";

export const productSchema = productFormSchema.extend({
	title: productFormSchema.shape.title.refine(
		async (value) => {
			const isUnique = await checkUniqueTitle(value);
			console.log(value, isUnique);
			return isUnique;
		},
		{
			path: [validationType.SERVER_ZOD_VALIDATION],
			params: { error_type: "unique-title" },
			message: "Title already exist",
		}
	),
});

export const productTitleValidationSchema = productSchema.pick({ title: true });
export const updateProductSchema = productSchema
	.extend({
		productId: z.string(),
		userId: z.string(),
		title: z.string().min(3),
		deletedAt: z.bigint(),
	})
	.refine(
		async (value) => {
			const isUnique = await checkUniqueTitleUpdated(value.title, value.userId);
			return isUnique;
		},
		{
			path: [validationType.SERVER_ZOD_VALIDATION],
			params: { error_type: "unique-title" },
			message: "Title already exist",
		}
	);

export const deleteProductSchema = z.object({
	productId: z.string(),
	deletedAt: z.literal(0),
});

export const productSoldSchema = z.object({
	productId: z.string(),
	sellerId: z.string(),
});

export const productRentedSchema = z.object({
	productId: z.string(),
	deletedAt: z.literal(0),
	hours: z.number().gte(1),
});
