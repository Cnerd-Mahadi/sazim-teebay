import { Request, Response, Router } from "express";

export const router = Router();

router.get("/me", (req: Request, res: Response) => {
	res.send("Yeah all working fine!");
});
