import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import React from "react";
import { Router } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = React.useState(false);
	React.useEffect(() => {
		const start = () => {
			setLoading(true);
		};
		const end = () => {
			setLoading(false);
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	pageProps.loading = loading;

	return (
		<>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
