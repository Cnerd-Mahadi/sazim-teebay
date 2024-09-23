import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { addProductInputs } from "@/types/product";
import { Control } from "react-hook-form";
import { SelectBrandInput } from "./select-brand-input";
import { SelectRentTypeInput } from "./select-rent-type-input";

interface SelectControlProps {
	control: Control<addProductInputs>;
	label: string;
	fieldname: keyof addProductInputs;
}

export const SelectControl = ({
	control,
	label,
	fieldname,
}: SelectControlProps) => {
	return (
		<FormField
			control={control}
			name={fieldname}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{fieldname === "brandId" ? (
							<SelectBrandInput fieldName={fieldname} />
						) : (
							<SelectRentTypeInput fieldName={fieldname} />
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
