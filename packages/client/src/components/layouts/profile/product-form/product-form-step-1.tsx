import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProductForm } from "@/contexts/product-form-context";
import { formatZodCustomError } from "@/helpers";
import { trpcClient } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";
import { ADD_PRODUCT_FORM_STEPS } from ".";
import { ProductInputField } from "../product-input-field";

export const titleField = productFormSchema.pick({ title: true });
export type TitleFieldType = z.infer<typeof titleField>;

export const ProductFormStep1 = ({
	setCurrentStep,
}: {
	setCurrentStep: Dispatch<SetStateAction<ADD_PRODUCT_FORM_STEPS>>;
}) => {
	const { fields, setFields } = useProductForm();
	const form = useForm<z.infer<typeof titleField>>({
		resolver: zodResolver(titleField),
		mode: fields.title.isDirty ? "onChange" : "onSubmit",
		defaultValues: {
			title: fields.title.value,
		},
	});
	const { isPending, mutate } =
		trpcClient.product.validateProductTitle.useMutation({
			onSuccess: async (response) => {
				if (response.success) {
					setFields((prev) => {
						return {
							...prev,
							title: { ...prev.title, value: response.value },
						};
					});
					setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP2);
				}
			},
			onError: async (response) => {
				console.log(response.data?.zodError);
				const validationError = formatZodCustomError(response.data?.zodError);
				console.log(validationError);
				if (validationError && validationError.type === "unique-title") {
					form.setError("title", {
						type: "custom",
						message: validationError.message,
					});
					throw new Error(validationError.message);
				}
			},
		});

	const onSubmit = (value: TitleFieldType) => {
		console.log(value);
		setFields((prev) => {
			return {
				...prev,
				title: {
					...prev.title,
					isDirty: true,
				},
			};
		});
		mutate(value);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<ProductInputField control={form.control} name="title" label="Title" />
				<div className="flex flex-row justify-end">
					<Button className="px-6">Next</Button>
				</div>
			</form>
		</Form>
	);
};
