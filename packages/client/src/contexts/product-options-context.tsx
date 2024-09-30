"use client";

import { trpcClient } from "@/trpc";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type CATEGORIES_TYPE = {
	id: string;
	type: string;
}[];
export type BRANDS_TYPE = {
	id: string;
	name: string;
}[];

const optionsInit = {
	categories: [] as CATEGORIES_TYPE,
	brands: [] as BRANDS_TYPE,
};

type OptionsType = typeof optionsInit;

const optionsContext = createContext<{
	options: OptionsType;
} | null>(null);

export const ProductOptionsProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [options, setOptions] = useState(optionsInit);
	const { data: categories } = trpcClient.product.categories.useQuery();
	const { data: brands } = trpcClient.product.brands.useQuery();

	useEffect(() => {
		if (categories && brands) {
			setOptions({
				categories: categories,
				brands: brands,
			});
		}
	}, [categories, brands]);

	return (
		<optionsContext.Provider value={{ options }}>
			{children}
		</optionsContext.Provider>
	);
};

export const useProductOptions = () => {
	const context = useContext(optionsContext);
	if (!context) throw new Error("No product option context found!");
	return context;
};
