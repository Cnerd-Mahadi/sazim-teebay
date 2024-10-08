"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { productSchemaType } from "@/types/product";
import { useState } from "react";
import { ProductRentForm } from "../profile/product-form/porduct-rent-form";

export function DialogRentCard({ product }: { product: productSchemaType }) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild onClick={() => setOpen(true)}>
				<Button
					size={"sm"}
					className="border-2 border-slate-400 bg-transparent shadow-none px-6 font-medium text-slate-700 hover:text-white">
					Rent
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-neutral-50 w-full max-w-lg">
				<ProductRentForm product={product} setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
}
