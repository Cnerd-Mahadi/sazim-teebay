import { getProductByID } from "@/actions/product";
import { DialogBuyCard } from "@/components/layouts/dash/dialog-buy-card";
import { DialogRentCard } from "@/components/layouts/dash/dialog-rent-card";
import { organizeCategories } from "@/helpers/product";
import { ProductParams } from "@/types";
import { productSchemaType } from "@/types/product";

export default async function page({ params }: ProductParams) {
	const product = (await getProductByID(params.productId)) as productSchemaType;
	const parsedDate = Date.parse(product.createdAt);
	const creationDate = new Date(parsedDate);
	return (
		<div className="flex flex-col items-stretch border-2 border-slate-400 mx-auto p-6 rounded-md max-w-4xl">
			<h3 className="font-bold text-3xl text-center text-slate-800">
				Product Details
			</h3>
			<div className="pb-16">
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
			<div className="flex flex-row justify-center items-center gap-6 self-end">
				<DialogBuyCard product={product} />
				<DialogRentCard product={product} />
			</div>
		</div>
	);
}
