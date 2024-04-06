import Input from "@/component/Input";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import checkNewPassword from "@/utils/checkNewPassword";
import confirmPassword from "@/utils/confirmPassword";
import LoginBtn from "@/component/LoginBtn";
import checkNewEmail from "@/utils/checkNewEmail";
import { FormEvent, useState } from "react";
import instance from "@/lib/axios";
import { useRouter } from "next/router";

const Signup = () => {
	const router = useRouter();
	const [emailMessage, setEmailMessage] = useState("");
	const [passwordMessage, setPasswordMessage] = useState("");
	const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		console.log(e);
		e.preventDefault();
		const target = e.target as any;
		const [email, password, confirm] = [
			target[0].value,
			target[1].value,
			target[3].value
		];

		const passwordValidity = checkNewPassword({
			value: password
		} as HTMLInputElement);
		const confirmPasswordValidity = confirmPassword({
			value: confirm
		} as HTMLInputElement);

		if (!passwordValidity.valid) {
			setPasswordMessage(passwordValidity.message as string);
			return;
		}
		if (!confirmPasswordValidity.valid) {
			setConfirmPasswordMessage(confirmPasswordValidity.message as string);
			return;
		}

		try {
			const res = await instance.post("/sign-up", { email, password });
			console.log(res);
			router.push("/folder");
		} catch (error) {
			console.log(error);
			setEmailMessage("이메일을 확인해 주세요.");
			setPasswordMessage("비밀번호를 확인해 주세요");
		}
	};

	return (
		<div className={styles.Container}>
			<Image
				src="images/linkbrary.svg"
				alt="링크브러리 로고"
				width={210}
				height={40}
			></Image>
			<p className={styles.memberCheck}>
				이미 회원이신가요?{" "}
				<Link href="/signin" className={styles.link}>
					로그인 하기
				</Link>
			</p>

			<form onSubmit={handleSubmit}>
				<Input
					checkValidity={checkNewEmail}
					placeholder="이메일을 입력해 주세요."
					type="email"
					submitFail={emailMessage}
					setSubmitFail={setEmailMessage}
				></Input>
				<Input
					checkValidity={checkNewPassword}
					placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
					type="password"
					submitFail={passwordMessage}
					setSubmitFail={setPasswordMessage}
				></Input>
				<Input
					checkValidity={confirmPassword}
					placeholder="비밀번호와 일치하는 값을 입력해 주세요."
					type="confirmPassword"
					submitFail={confirmPasswordMessage}
					setSubmitFail={setConfirmPasswordMessage}
				></Input>
				<LoginBtn>회원가입</LoginBtn>
			</form>
		</div>
	);
};

export default Signup;
