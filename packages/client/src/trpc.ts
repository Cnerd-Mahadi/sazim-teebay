import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { inferRouterOutputs } from "@trpc/server";
import SuperJSON from "superjson";
import { AppRouter } from "teebay-common/src/types";
import { getToken } from "./actions/auth";
import { parsedENV } from "./utils";

export const trpcLinks = [
	httpBatchLink({
		url: parsedENV.NEXT_PUBLIC_BASE_URL,
		transformer: SuperJSON,
		async headers() {
			const token = await getToken();
			return {
				authorization: token ? token : "",
			};
		},
	}),
];

export const trpcServer = createTRPCClient<AppRouter>({
	links: trpcLinks,
});

export const trpcClient = createTRPCReact<AppRouter>();

export type TRPCRouterOutput = inferRouterOutputs<AppRouter>;
