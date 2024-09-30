import { checkUniqueEmail, getUserbyEmail } from "@/services/user.service";
import { checkHashedPassword } from "@/utils";
import { validationType } from "teebay-common/src/index";
import { NEVER, z, ZodIssueCode } from "zod";

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
				path: [validationType.SERVER_ZOD_VALIDATION],
				message: "Email already exist",
				params: { error_type: "unique-email" },
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
		path: [validationType.SERVER_ZOD_VALIDATION],
		params: { error_type: "invalid-creds" },
		message: "Invalid Credentials",
	});
	return NEVER;
});
