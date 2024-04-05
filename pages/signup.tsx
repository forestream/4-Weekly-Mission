import Input from "@/component/Input";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";

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
				<Input type=""></Input>
				<Input type=""></Input>
			</form>
		</div>
	);
};

export default Signup;
