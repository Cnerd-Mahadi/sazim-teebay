import { prisma } from "@/db/index.db";
import dayjs from "dayjs";

export async function getProductbyID(productId: string) {
	try {
		const product = await prisma.product.findFirst({
			where: {
				productId: productId,
				deletedAt: 0,
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
				deletedAt: 0,
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

export async function checkUniqueTitleUpdated(title: string, userId: string) {
	const product = await prisma.product.findFirst({
		where: {
			title: title,
			NOT: {
				ownerId: userId,
			},
		},
	});
	if (product) {
		return false;
	}
	return true;
}

export const isDurationExpired = (startDate: Date, hours: number) => {
	const duration = dayjs(startDate as Date).add(hours, "h");
	return duration.isBefore(dayjs());
};
