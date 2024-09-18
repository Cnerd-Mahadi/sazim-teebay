// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const brands = ["Apple", "Dell", "Samsung", "Reebok", "Sony"].map((item) => {
// 	return { name: item };
// });
// const categories = [
// 	"Electronics",
// 	"Toys",
// 	"Sporting Goods",
// 	"Phone",
// 	"Computer",
// ].map((item) => {
// 	return { type: item };
// });

// async function main() {
// 	const seedBrands = await prisma.brand.createMany({ data: brands });
// 	const seedCategories = await prisma.category.createMany({ data: categories });
// 	console.log(`brands seeded successfully - ${seedBrands}`);
// 	console.log(`categories seeded successfully - ${seedCategories}`);
// }
// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});
