import { getCategories } from "@/actions/product";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { addProductInputs, categoryType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { Control } from "react-hook-form";
import { ProductCategoryMultiSelect } from "./product-category-multi-select";

interface ProductCategoryControl {
	control: Control<addProductInputs>;
	label: string;
	name: keyof addProductInputs;
}

export const ProductCategoryControl = ({
	control,
	label,
	name,
}: ProductCategoryControl) => {
	const token = useCookies().get("token");
	if (!token) throw new Error("Token not found!");

	const { data, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => await getCategories(token),
	});

	if (isLoading) return <>Loading..</>;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<ProductCategoryMultiSelect
							list={data as categoryType[]}
							fieldName={name}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
