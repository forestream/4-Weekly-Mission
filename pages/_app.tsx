import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import React from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	const router = useRouter();

	if (router.route === "/signin" || router.route === "/signup")
		return (
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />;
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		);

	return (
		<QueryClientProvider client={queryClient}>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</QueryClientProvider>
	);
}
