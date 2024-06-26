import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../db/index.db";
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
	}
}

export async function getCurrentUser(bearer: string | undefined) {
	const decoded = verifyToken(bearer);
	if (!decoded) throw new Error("Token wasn't valid!");
	const user = await getUserbyEmail((decoded as JwtPayload).email);
	// console.log(decode)
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
