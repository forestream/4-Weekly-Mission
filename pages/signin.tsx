import Input from "@/component/Input";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
	return (
		<>
			<Image
				src="images/linkbrary.svg"
				alt="링크브러리 로고"
				width={100}
				height={20}
			></Image>
			<p>
				회원이 아니신가요?
				<Link href="/signup">회원 가입하기</Link>
			</p>
			<form>
				<Input placeholder={"이메일을 입력해주세요."}></Input>
				<Input placeholder={"비밀번호를 입력해주세요."}></Input>
			</form>
		</>
	);
};

export default Signin;
