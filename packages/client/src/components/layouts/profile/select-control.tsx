import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DefaultOptionType } from "antd/es/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { SelectBrandInput } from "./select-brand-input";

interface SelectControlProps<T extends FieldValues> {
	control: Control<T>;
	label: string;
	name: FieldPath<T>;
	options: DefaultOptionType[];
}

export const SelectControl = <T extends FieldValues>({
	control,
	label,
	name,
	options,
}: SelectControlProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<SelectBrandInput field={field} options={options} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
