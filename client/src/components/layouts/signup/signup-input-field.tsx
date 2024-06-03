import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupInputs } from "@/types/user";
import { Control } from "react-hook-form";

interface SignUpInputFieldProps {
	control: Control<signupInputs>;
	label: string;
	name: keyof signupInputs;
}

export const SignUpInputField = ({
	control,
	label,
	name,
}: SignUpInputFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input {...field} placeholder={label} className="py-5 pr-10" />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
