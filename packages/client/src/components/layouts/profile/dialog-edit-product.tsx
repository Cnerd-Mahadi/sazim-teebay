"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TRPCRouterOutput } from "@/trpc";
import { useState } from "react";
import { ProductEditForm } from "./product-form/product-edit-form";

export const DialogEditProduct = ({
	product,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="px-12">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="p-20 w-full max-w-3xl">
				<DialogHeader></DialogHeader>
				<ProductEditForm product={product} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
};
