import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DefaultOptionType } from "antd/es/select";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { ProductCategoryMultiSelect } from "./product-category-multi-select";

type ProductCategoryControlProps<T extends FieldValues> = {
	control: Control<T>;
	label: string;
	name: FieldPath<T>;
	options: DefaultOptionType[];
};

export const ProductCategoryControl = <T extends FieldValues>({
	control,
	label,
	name,
	options,
}: ProductCategoryControlProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<ProductCategoryMultiSelect field={field} options={options} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
