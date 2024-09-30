"use client";

import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";

export const productFormInit = {
	title: { value: "", isDirty: false },
	desc: { value: "", isDirty: false },
	categories: { values: [] as string[], isDirty: false },
	brandId: { value: "", isDirty: false },
	price: { value: 0, isDirty: false },
	rentPerHour: { value: 0, isDirty: false },
};

export type ProductFormType = typeof productFormInit;

const productFormContext = createContext<{
	fields: ProductFormType;
	setFields: Dispatch<SetStateAction<ProductFormType>>;
} | null>(null);

export const ProductFormContext = ({ children }: { children: ReactNode }) => {
	const [fields, setFields] = useState(productFormInit);

	return (
		<productFormContext.Provider value={{ fields, setFields }}>
			{children}
		</productFormContext.Provider>
	);
};

export const useProductForm = () => {
	const context = useContext(productFormContext);
	if (!context) throw new Error("No product form context found!");
	return context;
};
