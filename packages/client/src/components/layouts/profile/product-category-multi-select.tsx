"use client";

import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface ProductCategoryMultiSelectProps<T extends FieldValues> {
	field: ControllerRenderProps<T, Path<T>>;
	options: DefaultOptionType[];
}

export const ProductCategoryMultiSelect = <T extends FieldValues>({
	field,
	options,
}: ProductCategoryMultiSelectProps<T>) => {
	return (
		<Select
			style={{ display: "block" }}
			dropdownStyle={{ pointerEvents: "auto" }}
			mode="multiple"
			allowClear
			value={field.value}
			placeholder="Please select categories"
			onChange={field.onChange}
			options={options}
		/>
	);
};
