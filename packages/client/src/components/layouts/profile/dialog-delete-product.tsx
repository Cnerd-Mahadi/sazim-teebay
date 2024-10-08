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
import { trpcClient } from "@/trpc";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Trash } from "lucide-react";
import { useState } from "react";

export const DialogDeleteProduct = ({ productId }: { productId: string }) => {
	const [open, setOpen] = useState(false);
	const { mutate, isPending } = trpcClient.product.deleteProduct.useMutation({
		onSuccess: async (response) => {
			console.log(response.msg);
			setOpen(false);
		},
		onError: async (response) => {
			console.log(response.message);
		},
	});
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="px-12">
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
						onClick={() =>
							mutate({
								deletedAt: 0,
								productId: productId,
							})
						}
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
};
