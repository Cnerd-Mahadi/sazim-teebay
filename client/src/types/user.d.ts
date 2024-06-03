import { signInFormSchema, signUpFormSchema } from "@/lib/zod/user";
import { z } from "zod";

export type signupInputs = z.infer<typeof signUpFormSchema>;

export type signInInputs = z.infer<typeof signInFormSchema>;
