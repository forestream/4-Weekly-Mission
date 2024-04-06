import instance from "@/lib/axios";

const checkNewEmail = async (target: HTMLInputElement) => {
	if (!target.value) {
		return { valid: false, message: "이메일을 입력해 주세요." };
	}
	if (target.validity.typeMismatch) {
		return { valid: false, message: "올바른 이메일 주소가 아닙니다." };
	}

	try {
		await instance.post("/check-email", { email: target.value });
	} catch (error: any) {
		return { valid: false, message: "이미 존재하는 이메일입니다" };
	}

	return { valid: true };
};

export default checkNewEmail;
