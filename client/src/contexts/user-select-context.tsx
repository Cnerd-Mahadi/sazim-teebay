"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

const userChoiceContext = createContext<{
	choice: string;
	setChoice: Dispatch<SetStateAction<string>>;
} | null>(null);

export const UserSelectContext = ({ children }: { children: ReactNode }) => {
	const [choice, setChoice] = useState("all");
	return (
		<userChoiceContext.Provider
			value={{ choice: choice, setChoice: setChoice }}>
			{children}
		</userChoiceContext.Provider>
	);
};

export const useSelect = () => {
	const context = useContext(userChoiceContext);
	if (!context) throw new Error("No user choice context found!");
	return context;
};

export const selects = [
	{ key: "all", label: "All", fetch: "products" },
	{ key: "buy", label: "Buy", fetch: "productsBought" },
	{ key: "sell", label: "Sell", fetch: "productsSold" },
	{ key: "rent", label: "Rent", fetch: "productsRented" },
	{ key: "lend", label: "Lend", fetch: "productsLent" },
];
