import { selects } from "@/contexts/user-select-context";
import {
	addProductInputs,
	brandType,
	categoryType,
	productSchemaType,
} from "@/types/product";
import { baseUrl } from "@/utils";
import { getToken } from "./auth";

export async function getAllProducts() {
	const token = getToken();
	const response = await fetch(`${baseUrl}/productsListed`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function incrementView(productId: string, token: string) {
	const response = await fetch(`${baseUrl}/incrementView/${productId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function getProductByID(productId: string) {
	const token = getToken();
	const response = await fetch(`${baseUrl}/product/${productId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function buyProduct(product: productSchemaType, token: string) {
	const body = {
		productId: product.id,
		sellerId: product.ownerId,
	};
	console.log(token, body);
	const response = await fetch(`${baseUrl}/buyProduct`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const data = await response.json();
	return data;
}

export async function rentProduct(product: productSchemaType, token: string) {
	const body = {
		productId: product.id,
		onwerId: product.ownerId,
	};
	console.log(token, body);
	const response = await fetch(`${baseUrl}/buyProduct`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});
	const data = await response.json();
	return data;
}

export async function getProductsUser(choice: string, token: string) {
	const currentChoice = selects.find((item) => item.key === choice);
	console.log(currentChoice);
	if (!currentChoice) throw new Error("Current choice not found");
	const response = await fetch(`${baseUrl}/${currentChoice.fetch}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	console.log(choice, currentChoice, data);

	return data;
}

export async function deleteProduct(productId: string, token: string) {
	const response = await fetch(`${baseUrl}/${productId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function getBrands(token: string) {
	const response = await fetch(`${baseUrl}/brands`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export async function getCategories(token: string) {
	const response = await fetch(`${baseUrl}/categories`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();
	return data;
}

export const addProduct = async (values: addProductInputs, token: string) => {
	const brands: brandType[] = await getBrands(token);
	const categories: categoryType[] = await getCategories(token);
	const brand = brands.find((item) => item.name === values.brandId)?.id;
	const categoriesBody = categories.filter((item) =>
		values.categories.includes(item.type)
	);
	console.log(brand, categoriesBody);
	const response = await fetch(`${baseUrl}/addProduct`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			...values,
			categories: categoriesBody.map((item) => {
				return item.id;
			}),
			brandId: brand,
			showDay: values.showDay === 0 ? false : true,
		}),
	});
	const data = await response.json();
	return { data, response };
};
