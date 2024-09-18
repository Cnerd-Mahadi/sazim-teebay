import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { signupInputs } from "@/types/user";
import { convertDateToString, convertStringToDate } from "@/utils/date-time";
import { DatePicker } from "antd";
import { Control } from "react-hook-form";

interface DOBInputFieldProps {
	control: Control<signupInputs>;
	label: string;
	name: keyof signupInputs;
}

export const DOBInputField = ({ control, label, name }: DOBInputFieldProps) => {
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
								value={convertStringToDate(field.value)}
								onChange={(val) => {
									field.onChange(convertDateToString(val));
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
