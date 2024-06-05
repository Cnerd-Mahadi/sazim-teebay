import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addProductInputs } from "@/types/product";
import { Control } from "react-hook-form";

interface ProductInputFieldProps {
	control: Control<addProductInputs>;
	label: string;
	name: keyof addProductInputs;
	type?: string;
	triggerValidation: () => void;
}

export const ProductInputField = ({
	control,
	label,
	name,
	type,
	triggerValidation,
}: ProductInputFieldProps) => {
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
							type={type ? type : "text"}
							placeholder={label}
							onChange={(event) => {
								field.onChange(
									type === "number"
										? parseInt(event.target.value)
										: event.target.value
								);
								triggerValidation();
							}}
							className="py-5 pr-10 w-full"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
