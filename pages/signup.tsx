import Input from "@/component/Input";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import checkNewPassword from "@/utils/checkNewPassword";
import confirmPassword from "@/utils/confirmPassword";
import LoginBtn from "@/component/LoginBtn";
import checkNewEmail from "@/utils/checkNewEmail";

const Signup = () => {
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

			<form>
				<Input
					checkValidity={checkNewEmail}
					placeholder="이메일을 입력해 주세요."
					type="email"
				></Input>
				<Input
					checkValidity={checkNewPassword}
					placeholder="영문, 숫자를 조합해 8자 이상 입력해 주세요."
					type="password"
				></Input>
				<Input
					checkValidity={confirmPassword}
					placeholder="비밀번호와 일치하는 값을 입력해 주세요."
					type="confirmPassword"
				></Input>
				<LoginBtn>회원가입</LoginBtn>
			</form>
		</div>
	);
};

export default Signup;
