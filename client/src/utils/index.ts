import { envSchema } from "@/lib/zod";

export const parsedENV = envSchema.parse({
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});
