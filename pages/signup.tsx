import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SocialLogin from "@/component/SocialLogin";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { User, postSignup } from "@/apis/api";

const Signup = () => {
	const router = useRouter();

	useEffect(() => {
		const loggedIn = window.localStorage.getItem("accessToken");
		if (loggedIn) router.push("/folder");
	}, []);

	const signupMutation = useMutation({
		mutationFn: (user: User) => postSignup(user),
		onSuccess: () => router.push("/signin"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const { email, password } = data;
		signupMutation.mutate({ email, password });
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
				이미 회원이신가요?{" "}
				<Link href="/signin" className={styles.link}>
					로그인 하기
				</Link>
			</p>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<label className={styles.label}>이메일</label>
				<input
					className={styles.input}
					{...register("email", { required: true })}
				/>
				<label className={styles.label}>비밀번호</label>
				<input
					className={styles.input}
					type="password"
					{...register("password", { required: true })}
				/>
				<label className={styles.label}>비밀번호 확인</label>
				<input
					className={styles.input}
					type="password"
					{...register("passwordConfirm", { required: true })}
				/>
				<button className={styles.button}>회원가입</button>
			</form>
			<SocialLogin />
		</div>
	);
};

export default Signup;
