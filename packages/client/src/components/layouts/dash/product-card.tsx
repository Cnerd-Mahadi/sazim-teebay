"use client";

import { organizeCategories } from "@/helpers/product";
import { trpcClient, TRPCRouterOutput } from "@/trpc";
import { useRouter } from "next/navigation";

export const ProductCard = ({
	product,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
}) => {
	const router = useRouter();
	const { mutate } = trpcClient.product.incrementView.useMutation({
		mutationKey: ["product/viewInc"],
		onSuccess: (data) => {
			console.log(data.msg);
		},
		onError: async (response) => {
			console.log(response.message);
		},
	});

	const parsedDate = product.createdAt;
	const creationDate = new Date(parsedDate);

	return (
		<div
			onClick={() => {
				mutate({ id: product.productId });
				router.push(`/product-details/${product.productId}`);
			}}>
			<div className="border-slate-400 hover:bg-zinc-100 px-8 py-4 md:py-6 border rounded-xl w-full max-w-3xl cursor-pointer">
				<div className="flex flex-row justify-between">
					<h3 className="pb-5 font-semibold text-slate-800 text-xl">
						{product.title}
					</h3>
				</div>
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
				</p>
				<p className="pb-6 font-medium text-justify text-slate-500 text-sm">
					{product.description}
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
	);
};
