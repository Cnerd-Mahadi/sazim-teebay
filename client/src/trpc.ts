import { AppRouter } from "@server/routes/index.route";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { getToken } from "./actions/auth";
import { parsedENV } from "./utils";

export const trpcLinks = [
	httpBatchLink({
		url: parsedENV.NEXT_PUBLIC_BASE_URL,
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
