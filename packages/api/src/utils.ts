import bcrypt from "bcrypt";
import { config } from "dotenv";
import { envSchema } from "./lib/zod/env";

config({ path: ".env.local" });

export enum StatusCode {
	NotFound = 404,
	Success = 200,
	Created = 201,
	Invalid = 400,
	Unauthorized = 401,
	ServerError = 500,
}

export const parsedENV = envSchema.parse({
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_SECRET: process.env.JWT_SECRET,
});

export const getHashedPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(8);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const checkHashedPassword = async (password: string, hash: string) => {
	const isPassword = await bcrypt.compare(password, hash);
	return isPassword;
};
