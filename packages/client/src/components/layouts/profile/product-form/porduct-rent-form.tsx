import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { productRentFormSchema } from "@/lib/zod/product";
import { trpcClient, TRPCRouterOutput } from "@/trpc";
import { convertStringToDate } from "@/utils/date-time";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RentExpirationInputField } from "./rent-expiration-input-field";

export const ProductRentForm = ({
	product,
	setOpen,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const dateInit = dayjs().format();
	const form = useForm<z.infer<typeof productRentFormSchema>>({
		resolver: zodResolver(productRentFormSchema),
		defaultValues: {
			date: dateInit,
		},
	});
	const { mutate, isPending } = trpcClient.product.rentProduct.useMutation({
		onSuccess: async (response) => {
			console.log(response.msg);
			setOpen(false);
		},
		onError: async (response) => {
			console.log(response.message);
		},
	});

	const onSubmit = (value: z.infer<typeof productRentFormSchema>) => {
		const hours = convertStringToDate(value.date).diff(dayjs().format(), "h");
		mutate({
			productId: product.productId,
			deletedAt: 0,
			hours: hours,
		});
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<RentExpirationInputField
					control={form.control}
					name="date"
					label="Rent Expiration Time"
				/>
				<div className="flex flex-row justify-end gap-2 mt-6">
					<Button
						disabled={isPending}
						className="bg-slate-700 hover:bg-slate-800 px-6">
						{isPending && <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />}
						Rent
					</Button>
					<Button
						onClick={() => setOpen(false)}
						className="bg-slate-700 hover:bg-slate-800 px-6">
						No
					</Button>
				</div>
			</form>
		</Form>
	);
};
