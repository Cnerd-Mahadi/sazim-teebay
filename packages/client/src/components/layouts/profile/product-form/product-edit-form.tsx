import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useProductOptions } from "@/contexts/product-options-context";
import { formatZodCustomError } from "@/helpers";
import { updateProductFormSchema } from "@/lib/zod/product";
import { trpcClient, TRPCRouterOutput } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProductCategoryControl } from "../product-category-control";
import { ProductInputField } from "../product-input-field";
import { SelectControl } from "../select-control";

export const ProductEditForm = ({
	product,
	setOpen,
}: {
	product: TRPCRouterOutput["product"]["productsListed"][number];
	setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	const form = useForm<z.infer<typeof updateProductFormSchema>>({
		resolver: zodResolver(updateProductFormSchema),
		defaultValues: {
			title: product.title,
			desc: product.description,
			categories: product.categories.map((item) => item.categoryId),
			brandId: product.brandId,
			price: product.price,
			rentPerHour: product.rentPerHour,
		},
	});
	const { options } = useProductOptions();
	const userCookie = Cookies.get("user");
	if (!userCookie) throw new Error("No user found!");
	const user = JSON.parse(
		userCookie
	) as TRPCRouterOutput["user"]["signIn"]["user"];
	const optionsCategories = options.categories.map((item) => {
		return {
			value: item.id,
			label: item.type,
		};
	});
	const optionsBrands = options.brands.map((item) => {
		return {
			value: item.id,
			label: item.name,
		};
	});
	const { mutate } = trpcClient.product.updateProduct.useMutation({
		onSuccess: async (response) => {
			console.log(response.msg);
			setOpen(false);
		},
		onError: async (response) => {
			console.log(response.data?.zodError);
			const validationError = formatZodCustomError(response.data?.zodError);
			console.log(validationError);
			if (validationError && validationError.type === "unique-title") {
				form.setError("title", {
					type: "custom",
					message: validationError.message,
				});
				throw new Error(validationError.message);
			}
		},
	});

	const onSubmit = (values: z.infer<typeof updateProductFormSchema>) => {
		console.log(values, product.productId);
		mutate({
			...values,
			productId: product.productId,
			userId: user.id,
			deletedAt: product.deletedAt,
		});
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
				<div className="space-y-6">
					<ProductInputField
						control={form.control}
						name="title"
						label="Title"
					/>
					<ProductInputField
						control={form.control}
						name="desc"
						label="Description"
					/>
					<div className="space-y-6">
						<ProductCategoryControl
							control={form.control}
							label="Categories"
							name="categories"
							options={optionsCategories}
						/>
						<SelectControl
							control={form.control}
							name="brandId"
							label="Brand"
							options={optionsBrands}
						/>
					</div>
					<div className="space-y-6">
						<ProductInputField
							control={form.control}
							name="price"
							type="number"
							label="Price"
						/>
						<ProductInputField
							control={form.control}
							name="rentPerHour"
							type="number"
							label="Rent Per Hour"
						/>
					</div>
				</div>
				<div className="flex flex-row justify-end mt-6">
					<Button className="px-6">Update</Button>
				</div>
			</form>
		</Form>
	);
};
