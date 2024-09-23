"use server";

import { cookies } from "next/headers";

export const getCookieServerSide = async (name: string) => {
	const cookie = cookies().get(name);
	return cookie;
};
