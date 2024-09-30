import { ZodValidationErrorType } from "@/types";
import { validationType } from "teebay-common/src";

export const formatZodCustomError = (issues: ZodValidationErrorType) => {
	if (!issues) return false;
	const error = issues[0];
	if (
		error.code === "custom" &&
		error.path.includes(validationType.SERVER_ZOD_VALIDATION)
	) {
		let errorObj = {
			type: error.params?.error_type as string,
			message: error.message,
			path: error.path.find(
				(i) => i === validationType.SERVER_ZOD_VALIDATION
			) as string,
		};
		return errorObj;
	}
	return false;
};
