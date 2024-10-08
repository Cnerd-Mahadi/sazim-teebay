import { DialogCreateProduct } from "@/components/layouts/profile/dialog-create-product";
import { ProductUser } from "@/components/layouts/profile/product-user";
import { UserSideBar } from "@/components/layouts/profile/sidebar-user";
import { UserSidebarContext } from "@/contexts/user-sidebar-context";
import { getCookieServerSide } from "@/utils/cookie-server";

type USER_TYPE = {
	id: string;
	email: string;
};

export default async function page() {
	const token = await getCookieServerSide("user");
	if (!token) throw new Error("No user found!");
	const user = JSON.parse(token.value) as USER_TYPE;
	return (
		<main>
			<section className="flex flex-col items-center gap-10 pb-10">
				<div className="bg-slate-900 py-20 w-full font-bold text-4xl text-center text-slate-200">
					User Section
				</div>
				<UserSidebarContext>
					<div className="flex flex-row justify-between px-10 w-full">
						<div>
							<h2 className="font-bold text-2xl tracking-tight">
								Welcome back,
							</h2>
							<p className="font-medium text-slate-400">{user.email}</p>
						</div>
						<div className="flex flex-col gap-6">
							<DialogCreateProduct />
							<UserSideBar />
						</div>
					</div>
					<ProductUser />
				</UserSidebarContext>
			</section>
		</main>
	);
}
