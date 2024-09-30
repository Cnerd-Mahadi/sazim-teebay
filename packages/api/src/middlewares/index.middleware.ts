import { getUserbyEmail } from "@/services/user.service";
import { middleware } from "@/trpc";
import { TRPCError } from "@trpc/server";

export const authedMiddleware = middleware(async ({ ctx, next }) => {
	if (!ctx.email) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}
	const user = await getUserbyEmail(ctx.email as string);
	if (!user) throw new Error("No user found!");
	return next({
		ctx: {
			user: {
				id: user.id,
				email: user.email,
				activated: user.activated,
			},
		},
	});
});
