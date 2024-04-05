import Input from "@/component/Input";
import checkEmailValidity from "@/utils/checkEmailValidity";
import checkPasswordValidity from "@/utils/checkPasswordValidity";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/router";

const Signin = () => {
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as any;
		const [email, password] = [target[0].value, target[1].value];
		try {
			const res = await axios.post("/sign-in", { email, password });
			router.push("/folder");
		} catch (error) {
			console.log(error);
		}
	};

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
			<form onSubmit={handleSubmit}>
				<Input
					placeholder="이메일을 입력해주세요."
					type="email"
					checkValidity={checkEmailValidity}
				></Input>
				<Input
					placeholder="비밀번호를 입력해주세요."
					type="password"
					checkValidity={checkPasswordValidity}
				></Input>
				<button>로그인</button>
			</form>
		</>
	);
};

export default Signin;
