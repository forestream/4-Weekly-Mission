import Input from "@/component/Input";
import checkEmailValidity from "@/utils/checkEmailValidity";
import checkPasswordValidity from "@/utils/checkPasswordValidity";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Signin.module.css";
import LoginBtn from "@/component/LoginBtn";

const Signin = () => {
	const router = useRouter();
	const [emailMessage, setEmailMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");

	const loggedIn = window.localStorage.getItem("accessToken");
	if (loggedIn) router.push("/folder");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as any;
		const [email, password] = [target[0].value, target[1].value];
		try {
			const res = await axios.post("/sign-in", { email, password });

			window.localStorage.setItem("accessToken", res.data.data.accessToken);

			router.push("/folder");
		} catch (error) {
			setEmailMessage("이메일을 확인해 주세요.");
			setPasswordMessage("비밀번호를 확인해 주세요");
		}
	};

	return (
		<div className={styles.Container}>
			<Link href="/">
				<Image
					src="images/linkbrary.svg"
					alt="링크브러리 로고"
					width={210}
					height={40}
				></Image>
			</Link>
			<p className={styles.memberCheck}>
				회원이 아니신가요?
				<Link href="/signup" className={styles.link}>
					회원 가입하기
				</Link>
			</p>
			<form onSubmit={handleSubmit}>
				<Input
					placeholder="이메일을 입력해주세요."
					type="email"
					checkValidity={checkEmailValidity}
					submitFail={emailMessage}
					setSubmitFail={setEmailMessage}
				></Input>
				<Input
					placeholder="비밀번호를 입력해주세요."
					type="password"
					checkValidity={checkPasswordValidity}
					submitFail={passwordMessage}
					setSubmitFail={setPasswordMessage}
				></Input>
				<LoginBtn>로그인</LoginBtn>
			</form>
		</div>
	);
};

export default Signin;
