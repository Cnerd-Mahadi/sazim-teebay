import jwt from "jsonwebtoken";
import { parsedENV } from "..";

export function getToken(username: string) {
	const token = jwt.sign(
		{
			username: username,
		},
		parsedENV.JWT_SECRET
	);
	return token;
}

export function verifyToken(bearer: string | undefined) {
	try {
		const token = bearer ? bearer.split(" ")[1] : undefined;
		if (!token) return false;
		console.log(token);
		return jwt.verify(token, parsedENV.JWT_SECRET);
	} catch (error) {
		console.log(error);
		return false;
	}
}
