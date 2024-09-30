import { isUserValid } from "@/actions/auth";
import { Navbar } from "@/components/layouts/partials/navbar";
import { ProductOptionsProvider } from "@/contexts/product-options-context";
import { redirect } from "next/navigation";

export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userValid = await isUserValid();
	if (!userValid) redirect("/signin");
	return (
		<main className="bg-neutral-50 min-h-screen">
			<Navbar />
			<ProductOptionsProvider>{children}</ProductOptionsProvider>
		</main>
	);
}
