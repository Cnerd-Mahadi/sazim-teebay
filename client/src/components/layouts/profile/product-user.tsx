"use client";

import { getProductsUser } from "@/actions/product";
import { selects, useSelect } from "@/contexts/user-select-context";
import { productSchemaType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { ProductCardUser } from "./product-card-user";

export const ProductUser = () => {
	const { choice } = useSelect();
	const token = useCookies().get("token");
	if (!token) throw new Error("Token not found!");
	const { data, isLoading } = useQuery({
		queryKey: ["user-data", choice],
		queryFn: async () => await getProductsUser(choice, token),
	});

	if (isLoading) return <>Loading..</>;

	return data && data.length > 0 ? (
		data.map((item: any) => {
			return (
				<ProductCardUser
					key={item.id}
					product={
						(choice === selects[0].key
							? item
							: item.product) as productSchemaType
					}
				/>
			);
		})
	) : (
		<>No Product Found</>
	);
};
