import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import React from "react";
import { Router, useRouter } from "next/router";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	if (router.route === "/signin" || router.route === "/signup")
		return <Component {...pageProps} />;

	return (
		<>
			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-WX9TQCE9PE"
			/>
			<Script
				id="ga"
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
						    	gtag('js', new Date());
									gtag('config', 'G-WX9TQCE9PE');
										`
				}}
			/>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
