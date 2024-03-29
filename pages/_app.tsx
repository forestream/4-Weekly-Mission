import Footer from "@/component/Footer";
import NavBar from "@/component/NavBar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
