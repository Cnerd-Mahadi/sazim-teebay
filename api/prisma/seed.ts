import { prisma } from "@/db/index.db";
import brandsJSON from "./data/brands.json";
import categoriesJSON from "./data/categories.json";

const brands = brandsJSON.map((item) => {
	return {
		name: item.name,
	};
});

const categories = categoriesJSON.map((item) => {
	return {
		type: item.type,
	};
});

async function main() {
	const seedBrands = await prisma.brand.createMany({ data: brands });
	const seedCategories = await prisma.category.createMany({ data: categories });
	console.log(`brands seeded successfully - ${seedBrands}`);
	console.log(`categories seeded successfully - ${seedCategories}`);
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
