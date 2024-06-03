"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpFormSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpInputField } from "./signup-input-field";
import { SignUpInputPassword } from "./signup-input-password";
const formSchema = signUpFormSchema;

export const SignUpForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fname: "",
			lname: "",
			address: "",
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
	});

	// const { isPending, mutate } = useMutation({
	// 	mutationFn: (values: z.infer<typeof formSchema>) => signUp(values),
	// 	onSuccess: async (success) => {
	// 		console.log(success);
	// 	},
	// });

	function onSubmit(values: z.infer<typeof formSchema>) {
		// mutate(values);
		// signUp(values);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5 mx-auto">
				<div className="flex flex-row justify-stretch gap-6">
					<SignUpInputField
						control={form.control}
						name="fname"
						label="First Name"
					/>
					<SignUpInputField
						control={form.control}
						name="lname"
						label="Last Name"
					/>
				</div>
				<SignUpInputField
					control={form.control}
					name="address"
					label="Address"
				/>
				<div className="flex flex-row justify-stretch gap-6">
					<SignUpInputField control={form.control} name="email" label="Email" />
					<SignUpInputField control={form.control} name="phone" label="Phone" />
				</div>
				<SignUpInputPassword
					control={form.control}
					name="password"
					label="Password"
				/>
				<SignUpInputPassword
					control={form.control}
					name="confirmPassword"
					label="Confirm Password"
				/>
				<div className="pt-10">
					<Button
						type="submit"
						size={"lg"}
						className="flex flex-row bg-blue-500 hover:bg-blue-600 mx-auto w-full max-w-64">
						Sign Up
					</Button>
				</div>
			</form>
		</Form>
	);
};
