"use client";

import { deleteProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useState } from "react";

export function DialogDeleteProduct({ productId }: { productId: string }) {
	const [open, setOpen] = useState(false);
	const token = useCookies().get("token");
	const queryClient = new QueryClient();
	if (!token) throw new Error("Token not found!");
	const { mutate, isPending } = useMutation({
		mutationKey: ["delete/product"],
		mutationFn: async (productId: string) =>
			await deleteProduct(productId, token),
		onSuccess: (data) => {
			console.log(data);
			queryClient.invalidateQueries({ queryKey: ["delete/product"] });
			setOpen(false);
		},
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					onClick={() => console.log("DO")}
					className="top-4 right-4 absolute bg-transparent px-2">
					<Trash className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-neutral-50 w-full max-w-lg">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this product?
					</DialogTitle>
				</DialogHeader>
				<DialogFooter className="pt-10">
					<Button
						onClick={() => mutate(productId)}
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
