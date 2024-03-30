import Image from "next/image";
import styles from "./Input.module.css";
import onImg from "@/public/image/eye-on.svg";
import offImg from "@/public/image/eye-off.svg";
import { useState } from "react";

export default function Input({ className = "", ...props }) {
	const [inputContent, setInputContent] = useState("");
	const [inputError, setInputError] = useState(false);
	const [isWrite, setIsWrite] = useState(false);
	const [isVisible, setIsVisible] = useState(true);

	const handleChange = (e: any) => {
		const { value } = e.target;

		setInputContent(value);
		setInputError(value.trim() === "");
		setIsWrite(value.trim() !== ""); // eye-on, eye-off 버튼 활성화 판단
		console.log(inputContent, inputError, isWrite);
	};

	// input에 에러가 있는 경우 blur 설정하도록 정의
	const handleBlur = () => {
		setInputError(inputContent.trim() === "");
	};

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	return (
		<>
			<p className={styles.inputcontent}>
				<input
					required
					type={isVisible ? "text" : "password"}
					className={`${styles.input} ${
						inputError ? styles.inputError : ""
					} ${className}`}
					placeholder="입력"
					onChange={handleChange}
					onBlur={handleBlur}
					{...props}
				/>
				<button onClick={toggleVisibility} className={styles.eyeIcon}>
					{isWrite ? (
						<button onClick={toggleVisibility} className={styles.eyeIcon}>
							{isVisible ? (
								<Image src={onImg} width={16} height={16} alt="비밀번호 보기" />
							) : (
								<Image
									src={offImg}
									width={16}
									height={16}
									alt="비밀번호 숨기기"
								/>
							)}
						</button>
					) : (
						""
					)}
				</button>
			</p>
			{inputError && <p className={styles.error}>값을 입력해 주세요.</p>}
		</>
	);
}
