import { organizeCategories } from "@/helpers/product";
import { TRPCRouterOutput } from "@/trpc";
import Link from "next/link";

export const ProductCardUser = ({
	product,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
}) => {
	console.log(product);
	const parsedDate = product.createdAt;
	const creationDate = new Date(parsedDate);
	return (
		<div className="relative">
			{/* <DialogDeleteProduct productId={product.id} /> */}
			<Link href={`/user-product-details/${product.productId}`}>
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
								<span className="text-slate-800">Price: </span>${product.price}{" "}
								| Rent: ${product.rentPerHour}
							</p>
							<p className="pb-6 font-medium text-justify text-slate-500 text-sm">
								{product.description}
							</p>
							<div className="flex flex-row justify-between items-center">
								<p className="font-medium text-slate-400 text-xs">
									Date posted: {creationDate.toDateString()}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
