import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import React from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "@/lib/gtag";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	if (router.route === "/signin" || router.route === "/signup")
		return <Component {...pageProps} />;

	return (
		<>
			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script
				id="ga"
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
						    	gtag('js', new Date());
									gtag('config', '${gtag.GA_TRACKING_ID}');
										`
				}}
			/>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
