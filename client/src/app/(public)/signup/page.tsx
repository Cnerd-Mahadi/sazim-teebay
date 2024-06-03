import { Logo } from "@/components/layouts/partials/logo";
import { SignUpForm } from "@/components/layouts/signup/signup-form";

export default function page() {
	return (
		<main className="flex flex-row justify-center items-center bg-slate-100 py-10 min-h-screen">
			<section className="flex flex-col items-center border-0 border-slate-200 bg-white shadow-lg px-8 pt-10 pb-16 rounded-lg w-full max-w-2xl">
				<Logo />
				<SignUpForm />
			</section>
		</main>
	);
}
