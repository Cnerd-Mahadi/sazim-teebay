import z from "zod";

export const productFormSchema = z.object({
	title: z.string().min(3),
	desc: z.string().min(20),
	categories: z.string().array().min(1),
	brandId: z.string().min(1),
	price: z.number().int().gt(100),
	rentPerHour: z.number().int().gt(10),
});
