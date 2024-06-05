import { isUserValid } from "@/actions/auth";
import { Navbar } from "@/components/layouts/partials/navbar";
import { redirect } from "next/navigation";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userValid = isUserValid();
	if (!userValid) redirect("/signin");
	return (
		<main className="bg-neutral-50 min-h-screen">
			<Navbar />
			{children}
		</main>
	);
}
