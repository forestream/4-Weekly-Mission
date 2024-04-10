const checkPasswordValidity = (target: HTMLInputElement) => {
	if (!target.value) {
		return { valid: false, message: "비밀번호를 입력해 주세요." };
	}
	return { valid: true };
};

export default checkPasswordValidity;
