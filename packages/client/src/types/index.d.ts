import { ZodIssue } from "zod";
export interface ProductParams {
	params: {
		productId: string;
	};
}

export type ZodValidationErrorType = ZodIssue[] | null | undefined;
