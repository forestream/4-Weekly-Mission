import facebookIcon from "@/public/images/facebook.svg";
import twitterIcon from "@/public/images/twitter.svg";
import youtubeIcon from "@/public/images/youtube.svg";
import instagramIcon from "@/public/images/instagram.svg";
import {
	Container,
	Copyright,
	MobileCopyright,
	PolicyFaq,
	SnsIcons
} from "./style";
import Image from "next/image";

const Footer = () => {
	return (
		<>
			<Container>
				<Copyright>©codeit - 2023</Copyright>
				<PolicyFaq>
					<span>Privacy Policy</span>
					<span>FAQ</span>
				</PolicyFaq>
				<SnsIcons>
					<a href="https://facebook.com" target="_blank" rel="noreferrer">
						<Image src={facebookIcon} alt="페이스북 아이콘" />
					</a>
					<a href="https://twitter.com" target="_blank" rel="noreferrer">
						<Image src={twitterIcon} alt="트위터 아이콘" />
					</a>
					<a href="https://youtube.com" target="_blank" rel="noreferrer">
						<Image src={youtubeIcon} alt="유튜브 아이콘" />
					</a>
					<a href="https://instagram.com" target="_blank" rel="noreferrer">
						<Image src={instagramIcon} alt="인스타그램 아이콘" />
					</a>
				</SnsIcons>
			</Container>
			<MobileCopyright>©codeit - 2023</MobileCopyright>
		</>
	);
};

export default Footer;
