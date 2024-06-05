import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../services/auth.service";
import { getUserbyEmail } from "../services/user.service";
import { StatusCode } from "../utils";

export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const bearer = req.headers.authorization;
	const decoded = verifyToken(bearer);
	console.log(decoded);
	if (decoded) {
		const user = await getUserbyEmail((decoded as JwtPayload).email);
		return user
			? next()
			: res.status(StatusCode.Unauthorized).json({ msg: "Not authorized" });
	} else res.status(StatusCode.ServerError).json({ msg: "Token wasnt valid" });
}
