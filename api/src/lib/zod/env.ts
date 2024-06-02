import { z } from "zod";

export const envSchema = z
	.object({
		DATABASE_URL: z.string(),
		JWT_SECRET: z.string(),
	})
	.required();
