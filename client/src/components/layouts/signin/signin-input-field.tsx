import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInInputs } from "@/types/user";
import { Control } from "react-hook-form";

interface SignInInputFieldProps {
	control: Control<signInInputs>;
	label: string;
	name: keyof signInInputs;
}

export const SignInInputField = ({
	control,
	label,
	name,
}: SignInInputFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							{...field}
							placeholder={label}
							className="border-slate-300 shadow-none py-5 pr-10"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
