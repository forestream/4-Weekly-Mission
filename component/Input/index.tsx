import Image from "next/image";
import styles from "./Input.module.css";
import onImg from "@/public/images/eye-on.svg";
import offImg from "@/public/images/eye-off.svg";
import { FocusEvent, useState } from "react";

interface Props {
	className?: string;
	placeholder?: string;
	type: string;
	checkValidity?: (target: HTMLInputElement) => {
		valid: boolean;
		message?: string;
	};
	submitFail?: string;
	setSubmitFail?: (state: string) => any;
}

const TYPE_KOREAN: { [index: string]: string } = {
	email: "이메일",
	password: "비밀번호",
	confirmPassword: "비밀번호 확인"
};

export default function Input({
	className = "",
	placeholder = "",
	type = "",
	checkValidity,
	submitFail,
	setSubmitFail
}: Props) {
	const [inputContent, setInputContent] = useState("");
	const [isValid, setIsValid] = useState(true);
	const [validityMessage, setValidityMessage] = useState("");
	const [isVisible, setIsVisible] = useState(false);

	const handleChange = (e: any) => {
		if (setSubmitFail) setSubmitFail("");
		const { value } = e.target;
		setInputContent(value.trimStart().replaceAll(" ", ""));
	};

	// blur 시 input 에러 검사
	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		if (checkValidity) {
			const { valid, message = "" } = checkValidity(e.target);
			setIsValid(valid);
			setValidityMessage(message);
		}
	};

	const toggleIsVisible = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<div className={styles.inputContainer}>
				<label htmlFor={type} className={styles.label}>
					{TYPE_KOREAN[type]}
				</label>
				<input
					required
					id={type}
					type={isVisible ? "text" : type}
					className={`${styles.input} ${
						submitFail || !isValid ? styles.inputError : ""
					} ${className}`}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={placeholder}
					value={inputContent}
				/>
				{type === "password" && inputContent.trim().length > 0 && (
					<button
						type="button"
						onClick={toggleIsVisible}
						className={styles.eyeIcon}
					>
						<Image
							fill
							src={isVisible ? onImg : offImg}
							alt={isVisible ? "비밀번호 보기" : "비밀번호 숨기기"}
						/>
					</button>
				)}
				{(submitFail || !isValid) && (
					<p className={styles.error}>{submitFail || validityMessage}</p>
				)}
			</div>
		</>
	);
}
