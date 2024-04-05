const confirmPassword = (target: HTMLInputElement) => {
	const newPassword = document.getElementById("password");

	if (newPassword && target.value !== (newPassword as HTMLInputElement).value) {
		return { valid: false, message: "비밀번호가 일치하지 않아요." };
	}
	return { valid: true };
};

export default confirmPassword;
