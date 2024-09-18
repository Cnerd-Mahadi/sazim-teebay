import { Logo } from "@/components/layouts/partials/logo";
import { SignUpForm } from "@/components/layouts/signup/signup-form";

export default async function page() {
	return (
		<main className="flex flex-row justify-center items-center py-10 min-h-screen">
			<section className="flex flex-col items-center border-2 border-slate-400 px-8 pt-10 pb-16 rounded-lg w-full max-w-2xl">
				<Logo />
				<div className="pt-10">
					<SignUpForm />
				</div>
			</section>
		</main>
	);
}
