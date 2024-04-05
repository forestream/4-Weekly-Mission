import Input from "@/component/Input";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
	return (
		<>
			<Image
				src="images/linkbrary.svg"
				alt="링크브러리 로고"
				width={100}
				height={20}
			></Image>
			<p>
				이미 회원이신가요? <Link href="/signin">로그인 하기</Link>
			</p>
			<form>
				<Input></Input>
				<Input></Input>
			</form>
		</>
	);
};

export default Signup;
