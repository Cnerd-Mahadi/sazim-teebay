// import { useCookies } from "next-client-cookies";
import { Dispatch, SetStateAction, useState } from "react";
import { ProductFormStep1 } from "./product-form-step-1";
import { ProductFormStep2 } from "./product-form-step-2";
import { ProductFormStep3 } from "./product-form-step-3";
import { ProductFormStep4 } from "./product-form-step-4";

export enum ADD_PRODUCT_FORM_STEPS {
	STEP1 = 0,
	STEP2 = 1,
	STEP3 = 2,
	STEP4 = 3,
	STEP5 = 4,
}

export const ProductForm = ({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const [currentStep, setCurrentStep] = useState(ADD_PRODUCT_FORM_STEPS.STEP1);

	return (
		<>
			<div className="pb-10 font-semibold text-4xl text-center">
				{currentStep < ADD_PRODUCT_FORM_STEPS.STEP5 && "Create Product"}
			</div>
			<div className="space-y-5">
				{currentStep === ADD_PRODUCT_FORM_STEPS.STEP1 && (
					<ProductFormStep1 setCurrentStep={setCurrentStep} />
				)}
				{currentStep === ADD_PRODUCT_FORM_STEPS.STEP2 && (
					<ProductFormStep2 setCurrentStep={setCurrentStep} />
				)}
				{currentStep === ADD_PRODUCT_FORM_STEPS.STEP3 && (
					<ProductFormStep3 setCurrentStep={setCurrentStep} />
				)}
				{currentStep === ADD_PRODUCT_FORM_STEPS.STEP4 && (
					<ProductFormStep4 setOpen={setOpen} setCurrentStep={setCurrentStep} />
				)}
			</div>
		</>
	);
};
