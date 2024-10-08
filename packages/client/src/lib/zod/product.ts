import { convertStringToDate } from "@/utils/date-time";
import dayjs from "dayjs";
import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";

export const updateProductFormSchema = productFormSchema;

export const productRentFormSchema = z.object({
	date: z
		.string()
		.datetime({ offset: true })
		.refine(
			(value) => {
				const hours = convertStringToDate(value).diff(dayjs().format(), "h");
				return hours >= 1;
			},
			{
				message: "Rent duration must be more than one hour",
			}
		),
});

export const brandSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export const categorySchema = z.object({
	id: z.string(),
	type: z.string(),
});
