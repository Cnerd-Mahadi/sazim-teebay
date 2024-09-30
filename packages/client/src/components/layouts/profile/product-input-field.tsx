import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type ProductInputFieldProps<T extends FieldValues> = {
	control: Control<T>;
	label: string;
	name: FieldPath<T>;
	type?: "number" | "text";
};

export const ProductInputField = <T extends FieldValues>({
	control,
	label,
	name,
	type = "text",
}: ProductInputFieldProps<T>) => {
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
							type={type}
							placeholder={label}
							className="py-5 pr-10 w-full"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
