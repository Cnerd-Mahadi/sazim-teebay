"use client";

import { signIn } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signInFormSchema } from "@/lib/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInInputField } from "./signin-input-field";
import { SignInInputPassword } from "./signin-input-password";

const formSchema = signInFormSchema;

export const SignInForm = () => {
	const router = useRouter();
	const cookies = useCookies();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: (values: z.infer<typeof formSchema>) => signIn(values),
		onSuccess: async (success) => {
			const { data, response } = success;
			if (response.status === 401) {
				form.setError("password", {
					type: "custom",
					message: "Invalid credentials!",
				});
				throw new Error("Invalid credentials!");
			} else {
				const token = data.token;
				if (!token) throw new Error("No token found!");
				cookies.set("token", token);
				router.push("/");
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
						disabled={form.formState.isSubmitting || isPending}
						className="flex flex-row bg-violet-600 hover:bg-violet-500 mx-auto w-full max-w-64">
						{(form.formState.isSubmitting || isPending) && (
							<ReloadIcon className="mr-2 w-4 h-4 animate-spin" />
						)}
						Sign In
					</Button>
				</div>
			</form>
		</Form>
	);
};
