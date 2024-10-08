"use client";

import { useUserSidebar } from "@/contexts/user-sidebar-context";
import { UserChoiceHooks } from "@/hooks/user-choice-hooks";
import { TRPCRouterOutput } from "@/trpc";
import { ProductCardUser } from "./product-card-user";

export const ProductUser = () => {
	const { choice } = useUserSidebar();
	console.log(choice);
	const response = UserChoiceHooks({ choice: choice });
	if (!response) {
		throw new Error("Error");
	}
	const { data, isLoading } = response;

	if (isLoading) return <>Loading...</>;

	return data && data.length ? (
		choice === "library" ? (
			(data as TRPCRouterOutput["user"]["productsUser"]).map((item) => {
				return <ProductCardUser key={item.productId} product={item} />;
			})
		) : (
			(data as TRPCRouterOutput["user"]["productsBought"]).map((item) => {
				return (
					<ProductCardUser
						key={item.product.productId}
						product={item.product}
					/>
				);
			})
		)
	) : (
		<>No Product Found</>
	);
};
