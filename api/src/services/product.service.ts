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

export async function getProductbyTitle(title: string) {
	try {
		const product = await prisma.product.findFirst({
			where: {
				title: title,
			},
		});
		return product ? product : false;
	} catch (error) {
		console.error(error);
	}
}

export async function checkUniqueTitle(title: string) {
	const product = await getProductbyTitle(title);
	if (product) {
		return false;
	}
	return true;
}
