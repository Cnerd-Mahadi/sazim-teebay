"use client";

import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

interface SelectBrandInputProps<T extends FieldValues> {
	field: ControllerRenderProps<T, Path<T>>;
	options: DefaultOptionType[];
}

export const SelectBrandInput = <T extends FieldValues>({
	field,
	options,
}: SelectBrandInputProps<T>) => {
	return (
		<Select
			style={{ display: "block" }}
			dropdownStyle={{ pointerEvents: "auto" }}
			placeholder="Please select a brand"
			showSearch
			value={field.value}
			optionFilterProp="label"
			onChange={field.onChange}
			options={options}
		/>
	);
};
