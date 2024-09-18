import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { ZodError } from "zod";
import { verifyToken } from "./services/auth.service";

export const createContext = async (opts: CreateExpressContextOptions) => {
	const bearer = opts.req.headers.authorization as string;
	const decoded = verifyToken(bearer);
	const email = decoded ? (decoded.email as string) : decoded;
	return { email };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
	errorFormatter(opts) {
		const { shape, error } = opts;
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === "BAD_REQUEST" && error.cause instanceof ZodError
						? error.cause.issues
						: null,
			},
		};
	},
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;
