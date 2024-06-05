import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInInputs } from "@/types/user";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Control } from "react-hook-form";

interface SignInInputPasswordProps {
	control: Control<signInInputs>;
	label: string;
	name: keyof signInInputs;
}

export const SignInInputPassword = ({
	control,
	label,
	name,
}: SignInInputPasswordProps) => {
	const [showPass, setShowPass] = useState(false);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<div className="relative">
							<Input
								{...field}
								type={showPass ? "text" : "password"}
								placeholder={label}
								className="border-slate-300 shadow-none py-5 pr-10"
							/>
							{showPass ? (
								<EyeOpenIcon
									onClick={() => setShowPass(!showPass)}
									className="top-3 right-3 absolute w-4 h-4 text-slate-500 hover:text-slate-900 cursor-pointer"
								/>
							) : (
								<EyeClosedIcon
									onClick={() => setShowPass(!showPass)}
									className="top-3 right-3 absolute w-4 h-4 text-slate-500 hover:text-slate-900 cursor-pointer"
								/>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
