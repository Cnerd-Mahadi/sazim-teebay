import { DialogCreateProduct } from "@/components/layouts/profile/dialog-create-product";
import { ProductUser } from "@/components/layouts/profile/product-user";
import { UserSideBar } from "@/components/layouts/profile/sidebar-user";
import { UserSidebarContext } from "@/contexts/user-sidebar-context";

export default function page() {
	return (
		<main>
			<section className="flex flex-col items-center gap-10 pb-10">
				<div className="bg-slate-900 py-20 w-full font-bold text-4xl text-center text-slate-200">
					User Section
				</div>
				<UserSidebarContext>
					<div className="flex flex-col gap-6 px-10 self-end">
						<DialogCreateProduct />
						<UserSideBar />
					</div>
					<ProductUser />
				</UserSidebarContext>
			</section>
		</main>
	);
}
