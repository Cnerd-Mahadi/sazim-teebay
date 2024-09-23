import { prisma } from "@/db/index.db";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./auth.service";

export async function getUserbyEmail(email: string) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});

		return user ? user : false;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function getCurrentUser(bearer: string) {
	const decoded = verifyToken(bearer);
	if (!decoded) throw new Error("Token wasn't valid!");
	const user = await getUserbyEmail((decoded as JwtPayload).email);
	if (!user) throw new Error("No current user found");
	return user;
}

export async function checkUniqueEmail(email: string) {
	const user = await getUserbyEmail(email);
	if (user) {
		return false;
	}
	return true;
}
