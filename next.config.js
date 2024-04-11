/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "codeit-images.codeit.com",
				port: "",
				pathname: "/**"
			},
			{
				protocol: "https",
				hostname: "cloudflare-ipfs.com",
				port: "",
				pathname: "/**"
			}
		]
	}
};

module.exports = nextConfig;
