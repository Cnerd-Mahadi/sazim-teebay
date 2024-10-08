"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

export const selects = [
	{ key: "library", label: "Library" },
	{ key: "buy", label: "Bought" },
	{ key: "sell", label: "Sold" },
	{ key: "rent", label: "Rented" },
	{ key: "lend", label: "Lent" },
] as const;

export type KEY_TYPE = (typeof selects)[number]["key"];

const UserChoiceContext = createContext<{
	choice: KEY_TYPE;
	setChoice: Dispatch<SetStateAction<KEY_TYPE>>;
} | null>(null);

export const UserSidebarContext = ({ children }: { children: ReactNode }) => {
	const [choice, setChoice] = useState<KEY_TYPE>(selects[0].key);
	return (
		<UserChoiceContext.Provider
			value={{ choice: choice, setChoice: setChoice }}>
			{children}
		</UserChoiceContext.Provider>
	);
};

export const useUserSidebar = () => {
	const context = useContext(UserChoiceContext);
	if (!context) throw new Error("No user choice context found!");
	return context;
};
