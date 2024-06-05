import { DialogCreateProduct } from "@/components/layouts/profile/dialog-create-product";
import { FilterUserChoice } from "@/components/layouts/profile/filter-user";
import { ProductUser } from "@/components/layouts/profile/product-user";
import { UserSelectContext } from "@/contexts/user-select-context";

export default function page() {
	return (
		<main>
			<section className="flex flex-col items-center gap-10 pb-10">
				<div className="bg-slate-900 py-20 w-full font-bold text-4xl text-center text-slate-200">
					User Section
				</div>
				<UserSelectContext>
					<div className="flex flex-row gap-6 pr-10 self-end">
						<DialogCreateProduct />
						<FilterUserChoice />
					</div>
					<ProductUser />
				</UserSelectContext>
			</section>
		</main>
	);
}
