const checkEmailValidity = (target: HTMLInputElement) => {
	if (!target.value) {
		return { valid: false, message: "이메일을 입력해 주세요." };
	}
	if (target.validity.typeMismatch) {
		return { valid: false, message: "올바른 이메일 주소가 아닙니다." };
	}

	return { valid: true };
};
export default checkEmailValidity;
