"use client";

import { getBrands } from "@/actions/product";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { addProductInputs, brandType } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useFormContext } from "react-hook-form";
interface SelectBrandInputProps {
	fieldName: keyof addProductInputs;
}

export function SelectBrandInput({ fieldName }: SelectBrandInputProps) {
	const token = useCookies().get("token");
	const { setValue, trigger, getValues } = useFormContext();
	if (!token) throw new Error("Token not found!");
	const { data, isLoading } = useQuery({
		queryKey: ["brands"],
		queryFn: async () => await getBrands(token),
	});

	if (isLoading) return <>Loading..</>;

	const selectLabel = (data as brandType[]).find(
		(item) => item.id === getValues(fieldName)
	);

	return (
		<Select
			onValueChange={async (value) => {
				setValue(fieldName, value);
				await trigger(fieldName);
			}}>
			<SelectTrigger className="w-full">
				<SelectValue
					placeholder={selectLabel ? selectLabel.name : "Select product brand"}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{data &&
						data.length > 0 &&
						(data as brandType[]).map((item) => (
							<SelectItem key={item.id} value={item.name}>
								{item.name}
							</SelectItem>
						))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
