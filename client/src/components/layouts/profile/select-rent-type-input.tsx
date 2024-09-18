"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { addProductInputs } from "@/types/product";
import { useFormContext } from "react-hook-form";
interface SelectRentTypeInputProps {
	fieldName: keyof addProductInputs;
}

const rentTypes = [
	{ value: 0, type: "hourly" },
	{ value: 1, type: "daily" },
];

export function SelectRentTypeInput({ fieldName }: SelectRentTypeInputProps) {
	const { setValue, trigger, getValues } = useFormContext();
	return (
		<Select
			onValueChange={async (value) => {
				setValue(fieldName, parseInt(value));
				await trigger(fieldName);
			}}>
			<SelectTrigger className="w-full">
				<SelectValue
					defaultValue={rentTypes[0].value}
					placeholder={rentTypes[0].type}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{rentTypes.map((item) => (
						<SelectItem key={item.value} value={item.value.toString()}>
							{item.type}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
