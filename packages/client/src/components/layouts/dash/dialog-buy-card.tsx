"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { trpcClient, TRPCRouterOutput } from "@/trpc";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function DialogBuyCard({
	product,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
}) {
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = trpcClient.product.buyProduct.useMutation({
		onSuccess: (response) => {
			console.log(response.msg);
			setOpen(false);
		},
		onError: (response) => {
			console.log(response.message);
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					size={"sm"}
					className="border-2 border-slate-400 bg-transparent shadow-none px-6 font-medium text-slate-700 hover:text-white">
					Buy
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-neutral-50 w-full max-w-lg">
				<DialogHeader>
					<DialogTitle>Are you sure you want to buy this product?</DialogTitle>
				</DialogHeader>
				<DialogFooter className="pt-10">
					<Button
						onClick={() => mutate({ productId: product.productId })}
						disabled={isPending}
						className="bg-slate-700 hover:bg-slate-800 px-6">
						{isPending && <ReloadIcon className="mr-2 w-4 h-4 animate-spin" />}
						Yes
					</Button>
					<Button
						onClick={() => setOpen(false)}
						className="bg-slate-700 hover:bg-slate-800 px-6">
						No
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
