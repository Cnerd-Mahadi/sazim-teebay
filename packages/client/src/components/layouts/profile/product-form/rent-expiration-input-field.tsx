import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { productRentFormSchema } from "@/lib/zod/product";
import { convertStringToDate } from "@/utils/date-time";
import { DatePicker } from "antd";
import { Control } from "react-hook-form";
import { z } from "zod";

interface RentExpirationInputFieldProps {
	control: Control<z.infer<typeof productRentFormSchema>>;
	label: string;
	name: "date";
}

export const RentExpirationInputField = ({
	control,
	label,
	name,
}: RentExpirationInputFieldProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				return (
					<FormItem className="w-full">
						<FormLabel>{label}</FormLabel>
						<FormControl>
							<DatePicker
								showTime
								use12Hours
								value={convertStringToDate(field.value)}
								onChange={(val) => {
									const date = val.format();
									field.onChange(date);
								}}
								placeholder={label}
								className="border-slate-300 shadow-none py-3 pr-10 w-full"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};
