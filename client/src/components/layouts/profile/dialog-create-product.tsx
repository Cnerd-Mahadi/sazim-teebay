"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ProductForm } from "./product-form";

export const DialogCreateProduct = () => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="bg-slate-700">Create Product</Button>
			</DialogTrigger>
			<DialogContent className="p-20 w-full max-w-3xl">
				<DialogHeader></DialogHeader>
				<ProductForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
};
