import styled from "styled-components";

export const ModalBackground = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1;
	cursor: default;
`;

export const ModalBox = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	border-radius: 1rem;
	justify-content: space-between;
	align-items: center;
	padding: 3.2rem 4rem;
	width: 360px;
	position: relative;

	.ModalX {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
		width: 24px;
		height: 24px;
		background-color: #e7effb;
		color: #9fa6b2;
		border-radius: 100%;
		&:hover {
			cursor: pointer;
		}
	}

	* {
		width: 100%;
		text-align: center;
	}

	p {
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 8px;
		&.folderName {
			font-size: 14px;
			font-weight: 400;
			color: #9fa6b2;
		}
	}

	button {
		font-size: 1.6rem;
		margin-top: 24px;
		padding: 16px 20px;
		border: none;
		color: white;
		border-radius: 8px;
		background-color: #ff5b56;

		&:hover {
			cursor: pointer;
		}
	}
`;
