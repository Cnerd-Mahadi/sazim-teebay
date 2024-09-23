import { z } from "zod";

export const envSchema = z
	.object({
		NEXT_PUBLIC_BASE_URL: z.string(),
	})
	.required();
