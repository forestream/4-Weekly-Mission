import Input from "@/component/Input";
import checkEmailValidity from "@/utils/checkEmailValidity";
import checkPasswordValidity from "@/utils/checkPasswordValidity";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Signin.module.css";
import LoginBtn from "@/component/LoginBtn";
import SocialLogin from "@/component/SocialLogin";
import { useMutation } from "@tanstack/react-query";
import { SIGNIN_KEY } from "@/lib/queryKeys";
import { postUser } from "@/apis/api";

const Signin = () => {
	const signinMutation = useMutation({
		mutationKey: [SIGNIN_KEY],
		mutationFn: (user: any) => postUser(user)
	});

	const router = useRouter();
	const [emailMessage, setEmailMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");

	useEffect(() => {
		const loggedIn = window.localStorage.getItem("accessToken");
		if (loggedIn) router.push("/folder");
	}, []);

	if (Object.keys(signinMutation.data || {}).includes("accessToken")) {
		window.localStorage.setItem("accessToken", signinMutation.data.accessToken);

		router.push("/folder");
	}

	if (signinMutation.isError) {
		setEmailMessage("이메일을 확인해 주세요.");
		setPasswordMessage("비밀번호를 확인해 주세요");
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const target = e.target as any;
		const [email, password] = [target[0].value, target[1].value];

		signinMutation.mutate({ email, password });
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
			<SocialLogin />
		</div>
	);
};

export default Signin;
