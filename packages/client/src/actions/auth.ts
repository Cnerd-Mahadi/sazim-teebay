import { getCookieServerSide } from "@/utils/cookie-server";
import Cookies from "js-cookie";

export const isUserValid = async () => {
	const token = await getToken();
	return token ? true : false;
};

export const getToken = async () => {
	if (typeof window !== "undefined") {
		return Cookies.get("token");
	} else {
		const token = await getCookieServerSide("token");
		return token?.value;
	}
};
