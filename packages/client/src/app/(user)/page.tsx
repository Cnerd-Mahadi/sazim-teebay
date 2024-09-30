import heroImage from "@/../public/images/hero.png";
import { ProductCard } from "@/components/layouts/dash/product-card";
import { trpcServer } from "@/trpc";
import Image from "next/image";

export default async function page() {
	const products = await trpcServer.product.productsListed.query();
	return (
		<main>
			<section className="flex flex-row justify-between items-center mx-auto mb-5 px-32 py-20 rounded-b-3xl max-w-screen-2xl">
				<div className="space-y-5">
					<h3 className="font-semibold text-6xl">
						<span className="text-violet-500">Buy, </span>{" "}
						<span className="text-zinc-600">Sell,</span>{" "}
						<span className="text-slate-700"> Rent</span>
					</h3>
					<h5 className="font-bold text-3xl text-slate-900">
						All in one place
					</h5>
				</div>
				<Image src={heroImage} alt="hero-image" className="max-w-md" />
			</section>
			<section className="flex flex-col items-center gap-10 pb-20">
				<div className="bg-slate-900 py-20 w-full font-bold text-4xl text-center text-slate-200">
					All Product
				</div>
				{products.length > 0 &&
					products.map((item) => <ProductCard key={item.id} product={item} />)}
			</section>
		</main>
	);
}
