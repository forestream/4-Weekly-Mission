import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import React from "react";
import { Router, useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	if (router.route === "/signin" || router.route === "/signup")
		return <Component {...pageProps} />;

	return (
		<>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
