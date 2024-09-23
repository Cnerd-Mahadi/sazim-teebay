import { productSchema } from "@/lib/zod/product";
import { z } from "zod";

const categories = productSchema.shape.categories;
type categoryType = z.infer<typeof categories>;

export const organizeCategories = (categories: categoryType) => {
	let categoryText = "";
	categories.forEach((item) => {
		categoryText += ` ${item.category.type},`;
	});
	return categoryText.slice(0, -1);
};
