import Image from "next/image";
import styles from "./SocialLogin.module.css";
import Link from "next/link";

const SocialLogin = () => {
	return (
		<div className={styles.container}>
			<p className={styles.text}>소셜 로그인</p>
			<Link href="https://www.google.com/">
				<div className={styles.google}>
					<Image
						src="/images/googleLogin.png"
						alt="구글 로그인"
						width={25}
						height={25}
					/>
				</div>
			</Link>
			<Link href="https://www.kakaocorp.com/page">
				<div className={styles.kakao}>
					<Image
						src="/images/kakaoLogin.svg"
						alt="카카오 로그인"
						width={25}
						height={25}
					/>
				</div>
			</Link>
		</div>
	);
};

export default SocialLogin;
