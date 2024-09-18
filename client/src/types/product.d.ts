import {
	brandSchema,
	categorySchema,
	productFormSchema,
	productSchema,
} from "@/lib/zod/product";
import { z } from "zod";

export type addProductInputs = z.infer<typeof productFormSchema>;

type productSchemaType = z.infer<typeof productSchema>;

type brandType = z.infer<typeof brandSchema>;

type categoryType = z.infer<typeof categorySchema>;
