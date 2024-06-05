import { isUserValid } from "@/actions/auth";
import { Logo } from "@/components/layouts/partials/logo";
import { SignInForm } from "@/components/layouts/signin/signin-form";
import { redirect } from "next/navigation";

export default async function page() {
	const userValid = isUserValid();
	if (userValid) redirect("/");
	return (
		<main className="flex flex-row justify-center items-center py-10 min-h-screen">
			<section className="flex flex-col items-center border-2 border-slate-400 px-8 pt-10 pb-16 rounded-lg w-full max-w-lg">
				<Logo />
				<SignInForm />
			</section>
		</main>
	);
}
