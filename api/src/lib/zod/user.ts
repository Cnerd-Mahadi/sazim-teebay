import { z } from "zod";

export const userSchema = z.object({
	fname: z.string(),
	lname: z.string(),
	address: z.string().min(8),
	phone: z.string().regex(/^01\d{9}$/),
	email: z.string().email(),
	password: z.string().min(5),
});
