import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProductForm } from "@/contexts/product-form-context";
import { trpcClient } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { productFormSchema } from "teebay-common/src/zod";
import { z } from "zod";
import { ADD_PRODUCT_FORM_STEPS } from ".";
import { ProductInputField } from "../product-input-field";

export const priceField = productFormSchema.pick({
	price: true,
	rentPerHour: true,
});

const priceFieldAsString = priceField.extend({
	price: z.coerce.number().int().gt(100),
	rentPerHour: z.coerce.number().int().gt(10),
});

export type PriceFieldType = z.infer<typeof priceFieldAsString>;

export const ProductFormStep4 = ({
	setCurrentStep,
	setOpen,
}: {
	setCurrentStep: Dispatch<SetStateAction<ADD_PRODUCT_FORM_STEPS>>;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const { fields, setFields } = useProductForm();
	const form = useForm<z.infer<typeof priceFieldAsString>>({
		resolver: zodResolver(priceFieldAsString),
		mode:
			fields.price.isDirty && fields.rentPerHour.isDirty
				? "onChange"
				: "onSubmit",
		defaultValues: {
			price: fields.price.value,
			rentPerHour: fields.rentPerHour.value,
		},
	});

	const { mutate } = trpcClient.product.addProduct.useMutation({
		onSuccess: async (response) => {
			console.log(response.msg);
			setOpen(false);
		},
		onError: async (response) => {
			console.log(response.message);
		},
	});

	const onSubmit = (value: PriceFieldType) => {
		console.log(value);
		setFields((prev) => {
			return {
				...prev,
				price: {
					value: value.price,
					isDirty: true,
				},
				rentPerHour: {
					value: value.rentPerHour,
					isDirty: true,
				},
			};
		});
		const product = {
			title: fields.title.value,
			desc: fields.desc.value,
			categories: fields.categories.values,
			brandId: fields.brandId.value,
			price: value.price,
			rentPerHour: value.rentPerHour,
		};
		console.log(product);
		mutate(product);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<ProductInputField
					control={form.control}
					name="price"
					type="number"
					label="Price"
				/>
				<ProductInputField
					control={form.control}
					name="rentPerHour"
					type="number"
					label="Rent Per Hour"
				/>
				<div className="flex flex-row justify-between">
					<Button
						type="button"
						className="px-6"
						onClick={() => setCurrentStep(ADD_PRODUCT_FORM_STEPS.STEP3)}>
						Back
					</Button>
					<Button className="px-6">Create Product</Button>
				</div>
			</form>
		</Form>
	);
};
