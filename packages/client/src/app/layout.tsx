import { TRPCQueryProvider } from "@/contexts/trpc-query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Teebay App",
	description: "Buy-Rent platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TRPCQueryProvider>{children}</TRPCQueryProvider>
			</body>
		</html>
	);
}
