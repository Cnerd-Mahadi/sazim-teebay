"use client";

import { buyProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { productSchemaType } from "@/types/product";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

export function DialogBuyCard({ product }: { product: productSchemaType }) {
	const [open, setOpen] = useState(false);
	const token = useCookies().get("token");
	if (!token) throw new Error("Token not found!");
	const { mutate, isPending } = useMutation({
		mutationFn: async (product: productSchemaType) =>
			await buyProduct(product, token),
		onSuccess: (data) => {
			console.log(data);
			setOpen(false);
		},
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="border-2 border-slate-400 bg-transparent shadow-none px-6 font-medium text-slate-700 hover:text-white">
					Buy
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-neutral-50 w-full max-w-lg">
				<DialogHeader>
					<DialogTitle>Are you sure you want to buy this product?</DialogTitle>
				</DialogHeader>
				<DialogFooter className="pt-10">
					<Button
						onClick={() => mutate(product)}
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
