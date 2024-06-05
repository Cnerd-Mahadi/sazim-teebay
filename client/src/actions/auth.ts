import { getCookies } from "next-client-cookies/server";

export const isUserValid = () => {
	const token = getCookies().get("token");
	return token ? true : false;
};

export const getToken = () => {
	console.log("HOLLY MECCA");
	const token = getCookies().get("token");
	if (!token) throw new Error("No token found!");
	return token;
};
