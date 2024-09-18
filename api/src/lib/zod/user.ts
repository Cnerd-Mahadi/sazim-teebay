import { NEVER, z, ZodIssueCode } from "zod";
import { checkUniqueEmail, getUserbyEmail } from "../../services/user.service";
import { checkHashedPassword } from "./../../utils";

export const signUpSchema = z.object({
	fname: z.string().min(3),
	lname: z.string().min(3),
	address: z.string().min(8),
	dob: z.string().date(),
	phone: z.string().regex(/^01\d{9}$/),
	email: z
		.string()
		.email()
		.refine(
			async (value) => {
				const isUnique = await checkUniqueEmail(value);
				return isUnique;
			},
			{
				message: "Email already exist",
				params: { errorType: "unique-email" },
			}
		),
	password: z.string().min(5),
});

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const credSchema = signInSchema.superRefine(async (val, ctx) => {
	const user = await getUserbyEmail(val.email);
	if (user) {
		const checkPass = await checkHashedPassword(val.password, user.password);
		if (checkPass) {
			return user;
		}
	}
	ctx.addIssue({
		code: ZodIssueCode.custom,
		params: { errorType: "invalid-creds" },
		message: "Invalid Credentials",
	});
	return NEVER;
});
