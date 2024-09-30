"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formatZodCustomError } from "@/helpers";
import { signInFormSchema } from "@/lib/zod/user";
import { trpcClient } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInInputField } from "./signin-input-field";
import { SignInInputPassword } from "./signin-input-password";

const formSchema = signInFormSchema;

export const SignInForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { isPending, mutate } = trpcClient.user.signIn.useMutation({
		onSuccess: async (response) => {
			if (response && response.token) {
				Cookies.set("token", response.token);
				Cookies.set("user", JSON.stringify(response.user));
				router.push("/");
			}
		},
		onError: async (response) => {
			console.log(response.data?.zodError);
			const validationError = formatZodCustomError(response.data?.zodError);
			console.log(validationError);
			if (validationError && validationError.type === "invalid-creds") {
				form.setError("password", {
					type: "custom",
					message: validationError.message,
				});
				throw new Error(validationError.message);
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
