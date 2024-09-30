"use client";

import { selects, useUserSidebar } from "@/contexts/user-sidebar-context";
import { trpcClient } from "@/trpc";
import { ProductCardUser } from "./product-card-user";

export const ProductUser = () => {
	const { choice, setChoice } = useUserSidebar();
	const currentFetch = selects.find((item) => item.key === choice)?.fetch;
	const { data, isLoading } = trpcClient.user[selects[0].fetch].useQuery();
	if (isLoading) return <>Loading..</>;

	return data ? (
		data.map((item) => {
			return <ProductCardUser key={item.id} product={item} />;
		})
	) : (
		<>No Product Found</>
	);
};
