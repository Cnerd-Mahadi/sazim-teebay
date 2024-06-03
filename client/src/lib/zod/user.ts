import { z } from "zod";

export const signUpFormSchema = z
	.object({
		fname: z.string().min(3),
		lname: z.string().min(3),
		address: z.string().min(8),
		phone: z.string().regex(/^01\d{9}$/),
		email: z.string().email(),
		password: z.string().min(5),
		confirmPassword: z.string(),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: "Passwords must match!",
			path: ["confirmPassword"],
		}
	);

export const signInFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5),
});
