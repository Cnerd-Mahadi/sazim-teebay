"use client";

import { incrementView } from "@/actions/product";
import { organizeCategories } from "@/helpers/product";
import { productSchemaType } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export const ProductCard = ({ product }: { product: productSchemaType }) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const token = useCookies().get("token");
	if (!token) throw new Error("Token not found!");
	const { mutate } = useMutation({
		mutationKey: ["product/viewInc"],
		mutationFn: () => incrementView(product.id, token),
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({ queryKey: ["product/viewInc"] });
		},
	});

	const parsedDate = Date.parse(product.createdAt);
	const creationDate = new Date(parsedDate);

	return (
		<div
			onClick={() => {
				mutate();
				router.push(`/product-details/${product.id}`);
			}}>
			<div className="flex flex-row justify-between items-start border-slate-400 hover:bg-zinc-100 px-8 py-4 md:py-6 border rounded-xl w-full max-w-3xl cursor-pointer">
				<div className="flex flex-row justify-between items-start gap-5">
					<div>
						<h3 className="pb-5 font-semibold text-slate-800 text-xl">
							{product.title}
						</h3>
						<p className="pb-2 font-medium text-slate-400 text-sm">
							<span className="text-slate-800">Categories: </span>
							{organizeCategories(product.categories)}
						</p>
						<p className="pb-2 font-medium text-slate-400 text-sm">
							<span className="text-slate-800">Brand: </span>
							{product.brand.name}
						</p>
						<p className="pb-4 font-medium text-slate-400 text-sm">
							<span className="text-slate-800">Price: </span>${product.price} |
							Rent: ${product.rentPerHour}
							{product.showDay ? " daily" : " hourly"}
						</p>
						<p className="pb-6 font-medium text-slate-500 text-sm">
							{product.desc}
						</p>
						<div className="flex flex-row justify-between items-center">
							<p className="font-medium text-slate-400 text-xs">
								Date posted: {creationDate.toDateString()}
							</p>
							<p className="font-medium text-slate-400 text-xs">
								{product.viewCount} views
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
