import Image from "next/image";
import styles from "./Input.module.css";
import onImg from "@/public/images/eye-on.svg";
import offImg from "@/public/images/eye-off.svg";
import { ChangeEvent, FocusEvent, useState } from "react";
import confirmPassword from "@/utils/confirmPassword";

interface Props {
	className?: string;
	placeholder?: string;
	type: string;
	checkValidity?: (target: HTMLInputElement) =>
		| Promise<{
				valid: boolean;
				message?: string;
		  }>
		| {
				valid: boolean;
				message?: string;
		  };
	submitFail?: string;
	setSubmitFail?: (state: string) => any;
}

const TYPE_KOREAN: { [index: string]: string[] } = {
	email: ["email", "이메일"],
	password: ["password", "비밀번호"],
	confirmPassword: ["password", "비밀번호 확인"]
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (setSubmitFail) setSubmitFail("");
		const { value } = e.target;
		setInputContent(value.trimStart().replaceAll(" ", ""));
	};

	// blur 시 input 에러 검사
	const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
		if (checkValidity) {
			const { valid, message = "" } = await checkValidity(e.target);
			setIsValid(valid);
			setValidityMessage(message);
		}
	};

	const toggleIsVisible = () => {
		setIsVisible((prev) => !prev);
	};

	return (
		<>
			<div className={styles.inputContainer}>
				<label htmlFor={type} className={styles.label}>
					{TYPE_KOREAN[type][1]}
				</label>
				<input
					required
					id={type}
					type={isVisible ? "text" : TYPE_KOREAN[type][0]}
					className={`${styles.input} ${
						submitFail || !isValid ? styles.inputError : ""
					} ${className}`}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={placeholder}
					value={inputContent}
				/>
				{TYPE_KOREAN[type][0] === "password" &&
					inputContent.trim().length > 0 && (
						<button
							type="button"
							onClick={toggleIsVisible}
							className={styles.eyeIcon}
						>
							<Image
								width={16}
								height={16}
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
