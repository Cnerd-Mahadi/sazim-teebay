import { signInInputs, signupInputs } from "@/types/user";
import { baseUrl } from "@/utils";

export const signUp = async (values: signupInputs) => {
	const response = await fetch(`${baseUrl}/signup`, {
		body: JSON.stringify(values),
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const signIn = async (values: signInInputs) => {
	const response = await fetch(`${baseUrl}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(values),
	});
	const data = await response.json();
	console.log(data, "token data");
	return { data, response };
};
