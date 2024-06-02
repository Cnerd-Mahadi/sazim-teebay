import { prisma } from "../db/index.db";

export async function getProductbyID(productId: string) {
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: productId,
			},
			include: {
				categories: true,
			},
		});
		return product ? product : false;
	} catch (error) {
		console.error(error);
	}
}
