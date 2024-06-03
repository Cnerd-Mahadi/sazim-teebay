import { Logo } from "@/components/layouts/partials/logo";
import { SignInForm } from "@/components/layouts/signin/signin-form";

export default function page() {
	return (
		<main className="flex flex-row justify-center items-center bg-slate-100 py-10 min-h-screen">
			<section className="flex flex-col items-center border-0 border-slate-200 bg-white shadow-lg px-8 pt-10 pb-16 rounded-lg w-full max-w-lg">
				<Logo />
				<SignInForm />
			</section>
		</main>
	);
}
