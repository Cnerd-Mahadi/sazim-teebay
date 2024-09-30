import { TRPCRouterOutput } from "@/trpc";

export const organizeCategories = (
	categories: TRPCRouterOutput["product"]["productsListed"][0]["categories"]
) => {
	let categoryText = "";
	categories.forEach((item) => {
		categoryText += ` ${item.category.type},`;
	});
	return categoryText.slice(0, -1);
};
