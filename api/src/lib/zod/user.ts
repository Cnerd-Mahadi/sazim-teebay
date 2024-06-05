import { z } from "zod";
import { checkUniqueEmail } from "../../services/user.service";

export const userSchema = z.object({
	fname: z.string().min(3),
	lname: z.string().min(3),
	address: z.string().min(8),
	phone: z.string().regex(/^01\d{9}$/),
	email: z
		.string()
		.email()
		.refine(
			async (value) => {
				const isUnique = await checkUniqueEmail(value);
				console.log(value, isUnique);
				return isUnique;
			},
			{ message: "Email already exist" }
		),
	password: z.string().min(5),
});
