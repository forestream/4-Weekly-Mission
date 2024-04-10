const checkNewPassword = (target: HTMLInputElement) => {
	if (!target.value) {
		return { valid: false, message: "비밀번호를 입력해 주세요." };
	}
	if (
		target.value.length < 8 ||
		!Number.isNaN(+target.value) ||
		target.value.split("").every((e) => Number.isNaN(+e))
	) {
		return {
			valid: false,
			message: "비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요."
		};
	}

	return { valid: true };
};

export default checkNewPassword;
