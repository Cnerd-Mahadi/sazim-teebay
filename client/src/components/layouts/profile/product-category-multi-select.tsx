"use client";

import { CheckIcon, X } from "lucide-react";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addProductInputs, categoryType } from "@/types/product";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";

interface ProductCategoryMultiSelectProps {
	list: categoryType[];
	fieldName: keyof addProductInputs;
}

export function ProductCategoryMultiSelect({
	list,
	fieldName,
}: ProductCategoryMultiSelectProps) {
	const { setValue, getValues, trigger } = useFormContext();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");

	const handleUnselect = React.useCallback((framework: string) => {
		setValue(
			fieldName,
			getValues(fieldName).filter((value: string) => value !== framework)
		);
	}, []);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Delete" || e.key === "Backspace") {
					if (input.value === "") {
						const newSelected = [...getValues(fieldName)];
						newSelected.pop();
						setValue(fieldName, newSelected);
					}
				}
			}
		},
		[]
	);

	const selectables = list.filter(
		(framework) => !(getValues(fieldName) as string[]).includes(framework.type)
	);
	return (
		<div className="border-input px-3 py-2 border rounded-md text-sm group ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
			<div className="flex flex-wrap gap-1">
				{(getValues(fieldName) as string[]).map((framework: string) => {
					return (
						<Badge key={framework} variant="secondary">
							{framework}
							<button
								className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
								onKeyDown={async (e) => {
									if (e.key === "Enter") {
										handleUnselect(framework);
										await trigger(fieldName);
									}
								}}
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
								onClick={async () => {
									handleUnselect(framework);
									await trigger(fieldName);
								}}>
								<X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
							</button>
						</Badge>
					);
				})}
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={open}
							className="justify-between w-[200px]">
							{"Select Categories..."}
							<CaretSortIcon className="opacity-50 ml-2 w-4 h-4 shrink-0" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[200px]">
						<Command>
							<CommandInput
								placeholder="Search categories..."
								className="h-9"
							/>
							<CommandList>
								<CommandEmpty>No category found.</CommandEmpty>
								<CommandGroup>
									{selectables.map((framework) => (
										<CommandItem
											key={framework.id}
											value={framework.type}
											onSelect={async (currentValue) => {
												setInputValue(
													currentValue === inputValue ? "" : currentValue
												);
												setValue(fieldName, [
													...getValues(fieldName),
													currentValue,
												]);
												await trigger(fieldName);
											}}>
											{framework.type}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													inputValue === framework.type
														? "opacity-100"
														: "opacity-0"
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
