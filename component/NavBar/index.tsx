import Profile from "../Profile";
import logoImage from "@/public/images/linkbrary.svg";
import { Nav } from "./style";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
	return (
		<Nav>
			<Link href="/">
				<Image src={logoImage} alt="링크브러리 로고 이미지" />
			</Link>
			<Profile />
		</Nav>
	);
};

export default NavBar;
