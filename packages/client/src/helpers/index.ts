import { ZodValidationErrorType } from "@/types";

export const formatZodCustomError = (issues: ZodValidationErrorType) => {
	if (!issues) return false;
	const error = issues[0];
	if (error.code === "custom") {
		let errorObj = {
			type: error.params?.errorType as string,
			message: error.message,
			path: error.path[0],
		};
		return errorObj;
	}
	return false;
};
