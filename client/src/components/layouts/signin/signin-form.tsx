"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInFormSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInInputField } from "./signin-input-field";
import { SignInInputPassword } from "./signin-input-password";

const formSchema = signInFormSchema;

export const SignInForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5 mx-auto w-full">
				<SignInInputField control={form.control} name="email" label="Email" />
				<SignInInputPassword
					control={form.control}
					name="password"
					label="Password"
				/>
				<div className="pt-10">
					<Button
						type="submit"
						size={"lg"}
						className="flex flex-row bg-blue-500 hover:bg-blue-600 mx-auto w-full max-w-64">
						Sign In
					</Button>
				</div>
			</form>
		</Form>
	);
};
