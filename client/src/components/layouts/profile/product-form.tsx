import { addProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import { productFormSchema } from "@/lib/zod/product";
import { addProductInputs } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ProductCategoryControl } from "./product-category-control";
import { ProductInputField } from "./product-input-field";
import { SelectControl } from "./select-control";

enum FORM_STEPS {
	STEP1 = 0,
	STEP2 = 1,
	STEP3 = 2,
	STEP4 = 3,
	STEP5 = 4,
}
const formSchema = productFormSchema;
const formSteps = [
	{ id: 0, fields: ["title"] },
	{ id: 1, fields: ["desc"] },
	{ id: 2, fields: ["categories", "brandId"] },
	{ id: 3, fields: ["price", "rentPerHour"] },
];

type fieldsType = keyof addProductInputs;

export const ProductForm = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [currentStep, setCurrentStep] = useState(FORM_STEPS.STEP1);
	const token = useCookies().get("token");
	if (!token) throw new Error("Token not found!");

	const { isPending, mutate } = useMutation({
		mutationFn: (values: addProductInputs) => addProduct(values, token),
		onSuccess: async (success) => {
			const { data, response } = success;
			if (response.status === 400) {
				const uniqueError = data.error.issues[0].message;
				if (uniqueError && uniqueError === "Title already exist") {
					form.setError("title", {
						type: "custom",
						message: "Title not unique!",
					});
					setCurrentStep(0);
					throw new Error("Title not unique!");
				}
			} else {
				console.log(data);
				setOpen(false);
			}
		},
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			desc: "",
			categories: [],
			brandId: "",
			price: 0,
			rentPerHour: 0,
			showDay: 0,
		},
	});

	const showCategories = () => {
		let categoryText = "";
		form.getValues("categories").forEach((item) => {
			categoryText += ` ${item},`;
		});
		return categoryText.slice(0, -1);
	};

	async function triggerInputValidation(name: fieldsType) {
		const fieldTouched = form.getFieldState(name).isTouched;
		if (fieldTouched) {
			await form.trigger(name, {
				shouldFocus: true,
			});
		}
	}

	const handleNext = async (name: fieldsType[]) => {
		const currentError = await form.trigger(name, {
			shouldFocus: true,
		});
		console.log(name, currentError);
		if (!currentError) return;
		setCurrentStep(currentStep + 1);
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		mutate(values);
	}

	return (
		<FormProvider {...form}>
			<div className="pb-10 font-semibold text-4xl text-center">
				{currentStep < FORM_STEPS.STEP5 && "Create Product"}
			</div>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				{currentStep === FORM_STEPS.STEP1 && (
					<ProductInputField
						control={form.control}
						name="title"
						label="Title"
						triggerValidation={() => triggerInputValidation("title")}
					/>
				)}
				{currentStep === FORM_STEPS.STEP2 && (
					<ProductInputField
						control={form.control}
						name="desc"
						label="Description"
						triggerValidation={() => triggerInputValidation("desc")}
					/>
				)}
				{currentStep === FORM_STEPS.STEP3 && (
					<div className="space-y-6">
						<ProductCategoryControl
							control={form.control}
							label="Categories"
							name="categories"
						/>
						<SelectControl
							control={form.control}
							fieldname="brandId"
							label="Brand"
						/>
					</div>
				)}
				{currentStep === FORM_STEPS.STEP4 && (
					<div className="space-y-6">
						<ProductInputField
							control={form.control}
							name="price"
							label="Price"
							type="number"
							triggerValidation={() => triggerInputValidation("price")}
						/>
						<div className="flex flex-row justify-stretch gap-6 w-full">
							<ProductInputField
								control={form.control}
								name="rentPerHour"
								label="Rent"
								type="number"
								triggerValidation={() => triggerInputValidation("rentPerHour")}
							/>
							<SelectControl
								control={form.control}
								fieldname="showDay"
								label="Rent Type"
							/>
						</div>
					</div>
				)}
				{currentStep === FORM_STEPS.STEP5 && (
					<div className="flex flex-col border-2 border-slate-400 mx-auto p-6 rounded-md max-w-4xl">
						<h3 className="font-bold text-3xl text-center text-slate-800">
							Product Summary
						</h3>
						<div className="pt-10 pb-16">
							<h3 className="pb-5 font-semibold text-slate-800 text-xl">
								{form.getValues("title")}
							</h3>
							<p className="pb-2 font-medium text-slate-400 text-sm">
								<span className="text-slate-800">Categories: </span>
								{showCategories()}
							</p>
							<p className="pb-2 font-medium text-slate-400 text-sm">
								<span className="text-slate-800">Brand: </span>
								{form.getValues("brandId")}
							</p>
							<p className="pb-4 font-medium text-slate-400 text-sm">
								<span className="text-slate-800">Price: </span>$
								{form.getValues("price")} | Rent: $
								{form.getValues("rentPerHour")}
								{form.getValues("showDay") ? " daily" : " hourly"}
							</p>
							<p className="pb-6 font-medium text-slate-500 text-sm">
								{form.getValues("desc")}
							</p>
						</div>
					</div>
				)}
				<div
					className={`flex flex-row ${
						currentStep === FORM_STEPS.STEP1 ? "justify-end" : "justify-between"
					} pt-10`}>
					{currentStep > FORM_STEPS.STEP1 && (
						<Button
							className="px-6"
							onClick={() => setCurrentStep(currentStep - 1)}>
							Back
						</Button>
					)}
					{currentStep === FORM_STEPS.STEP5 && (
						<Button
							type="submit"
							size={"lg"}
							disabled={form.formState.isSubmitting || isPending}
							className="px-6">
							{(form.formState.isSubmitting || isPending) && (
								<ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
							)}
							Create
						</Button>
					)}
					{currentStep < FORM_STEPS.STEP5 && (
						<Button
							type="button"
							className="px-6"
							onClick={async () =>
								await handleNext(formSteps[currentStep].fields as fieldsType[])
							}>
							Next
						</Button>
					)}
				</div>
			</form>
		</FormProvider>
	);
};
