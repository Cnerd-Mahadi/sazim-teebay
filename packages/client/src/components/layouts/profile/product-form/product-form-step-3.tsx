"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProductForm } from "@/contexts/product-form-context";
import { useProductOptions } from "@/contexts/product-options-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";
import { ADD_PRODUCT_FORM_STEPS } from ".";
import { ProductCategoryControl } from "../product-category-control";
import { SelectControl } from "../select-control";

export const selectFields = productFormSchema.pick({
	categories: true,
	brandId: true,
});
export type SelectFieldsType = z.infer<typeof selectFields>;

export const ProductFormStep3 = ({
	setCurrentStep,
}: {
	setCurrentStep: Dispatch<SetStateAction<ADD_PRODUCT_FORM_STEPS>>;
}) => {
	const { fields, setFields } = useProductForm();
	const { options } = useProductOptions();
	const optionsCategories = options.categories.map((item) => {
		return {
			value: item.id,
			label: item.type,
		};
	});
	const optionsBrands = options.brands.map((item) => {
		return {
			value: item.id,
			label: item.name,
		};
	});
	const form = useForm<z.infer<typeof selectFields>>({
		resolver: zodResolver(selectFields),
		mode:
			fields.categories.isDirty && fields.brandId.isDirty
				? "onChange"
				: "onSubmit",
		defaultValues: {
			categories: fields.categories.values,
			brandId: fields.brandId.value,
		},
	});
	const onSubmit = (value: SelectFieldsType) => {
		console.log(value);
		setFields((prev) => {
			return {
				...prev,
				categories: {
					values: value.categories,
					isDirty: true,
				},
				brandId: {
					value: value.brandId,
					isDirty: true,
				},
			};
		});
		setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP4);
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<div className="space-y-6">
					<ProductCategoryControl
						control={form.control}
						label="Categories"
						name="categories"
						options={optionsCategories}
					/>
					<SelectControl
						control={form.control}
						name="brandId"
						label="Brand"
						options={optionsBrands}
					/>
				</div>
				<div className="flex flex-row justify-between">
					<Button
						type="button"
						className="px-6"
						onClick={() => setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP2)}>
						Back
					</Button>
					<Button className="px-6">Next</Button>
				</div>
			</form>
		</Form>
	);
};
