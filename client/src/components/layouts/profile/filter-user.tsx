"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	selects as sourceSelects,
	useSelect,
} from "@/contexts/user-select-context";

export function FilterUserChoice() {
	const selects = sourceSelects;
	const { setChoice } = useSelect();
	return (
		<Select
			onValueChange={(value) => {
				console.log(value);
				setChoice(value);
			}}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={selects[0].label} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{selects.map((item) => (
						<SelectItem key={item.key} value={item.key}>
							{item.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
