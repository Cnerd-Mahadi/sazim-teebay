"use client";

import { signUp } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpFormSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpInputField } from "./signup-input-field";
import { SignUpInputPassword } from "./signup-input-password";

const formSchema = signUpFormSchema;

export const SignUpForm = () => {
	const router = useRouter();
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

	const { isPending, mutate } = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) => signUp(values),
		onSuccess: async (data) => {
			const validationError = data.error;
			if (validationError) {
				form.setError("email", {
					type: "custom",
					message: "Email already exists!",
				});
				throw new Error("Email already exists!");
			} else {
				console.log(data);
				router.push("/signin");
			}
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
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
						disabled={form.formState.isSubmitting || isPending}
						className="flex flex-row bg-violet-600 hover:bg-violet-500 mx-auto w-full max-w-64">
						{(form.formState.isSubmitting || isPending) && (
							<ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
						)}
						Sign Up
					</Button>
				</div>
			</form>
		</Form>
	);
};
