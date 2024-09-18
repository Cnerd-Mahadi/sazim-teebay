"use client";
import { trpcLinks, trpcClient as trpcReactClient } from "@/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export const TRPCQueryProvider = ({ children }: { children: ReactNode }) => {
	const { createClient, Provider } = trpcReactClient;
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		createClient({
			links: trpcLinks,
		})
	);

	return (
		<Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</Provider>
	);
};
