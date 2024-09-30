import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProductForm } from "@/contexts/product-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";
import { ADD_PRODUCT_FORM_STEPS } from ".";
import { ProductInputField } from "../product-input-field";

export const descField = productFormSchema.pick({ desc: true });
export type DescFieldType = z.infer<typeof descField>;

export const ProductFormStep2 = ({
	setCurrentStep,
}: {
	setCurrentStep: Dispatch<SetStateAction<ADD_PRODUCT_FORM_STEPS>>;
}) => {
	const { fields, setFields } = useProductForm();
	const form = useForm<z.infer<typeof descField>>({
		resolver: zodResolver(descField),
		mode: fields.desc.isDirty ? "onChange" : "onSubmit",
		defaultValues: {
			desc: fields.desc.value,
		},
	});
	const onSubmit = (value: DescFieldType) => {
		console.log(value);
		setFields((prev) => {
			return {
				...prev,
				desc: {
					value: value.desc,
					isDirty: true,
				},
			};
		});
		setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP3);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<ProductInputField
					control={form.control}
					name="desc"
					label="Description"
				/>
				<div className="flex flex-row justify-between">
					<Button
						type="button"
						className="px-6"
						onClick={() => setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP1)}>
						Back
					</Button>
					<Button className="px-6">Next</Button>
				</div>
			</form>
		</Form>
	);
};
