"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { formatZodCustomError } from "@/helpers";
import { signUpFormSchema } from "@/lib/zod/user";
import { trpcClient } from "@/trpc";
import { convertDateToString } from "@/utils/date-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DOBInputField } from "./dob-input-field";
import { SignUpInputField } from "./signup-input-field";
import { SignUpInputPassword } from "./signup-input-password";

const formSchema = signUpFormSchema;

export const SignUpForm = () => {
	const router = useRouter();
	const dateInit = convertDateToString(dayjs());
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fname: "",
			lname: "",
			address: "",
			dob: dateInit,
			email: "",
			phone: "",
			password: "",
			confirmPassword: "",
		},
	});

	const { isPending, mutate } = trpcClient.user.signUp.useMutation({
		onSuccess: async (data) => {
			console.log("Success", data);
			router.push("/signin");
		},
		onError: async (response) => {
			const validationError = formatZodCustomError(response.data?.zodError);
			if (validationError && validationError.type === "unique-email") {
				form.setError("email", {
					type: "custom",
					message: validationError.message,
				});
				throw new Error(validationError.message);
			}
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		// console.log(values);
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
				<DOBInputField
					control={form.control}
					name="dob"
					label="Date of Birth"
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
