import { parsedENV } from "@/utils";
import jwt, { JwtPayload } from "jsonwebtoken";

export function getToken(email: string) {
	const token = jwt.sign(
		{
			email: email,
		},
		parsedENV.JWT_SECRET
	);
	return token;
}

export function verifyToken(bearer: string) {
	try {
		const token = bearer;
		if (!token) {
			return false;
		}
		const verified = jwt.verify(token, parsedENV.JWT_SECRET) as JwtPayload;
		return verified;
	} catch (error) {
		console.log(error);
		return false;
	}
}
