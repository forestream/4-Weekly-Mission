import styled from "styled-components";
import shareIcon from "@/public/images/shareIcon.svg";
import penIcon from "@/public/images/penIcon.svg";
import deleteIcon from "@/public/images/deleteIcon.svg";
import { MouseEvent, useState } from "react";
import EditFolderNameModal from "../EditFolderNameModal";
import ShareFolderModal from "../ShareFolderModal";
import DeleteFolderModal from "../DeleteFolderModal";
import { FolderListDatum } from "../../apis/api";
import Image from "next/image";

const FolderOptions = styled.div`
	display: flex;

	img {
		width: 18px;
		height: 18px;
	}
	button {
		background: none;
		border: none;
		color: #9fa6b2;

		display: flex;
		gap: 4px;

		&:hover {
			cursor: pointer;
		}
	}
`;

interface Props {
	selectedFolder: FolderListDatum;
}

const FolderOption = ({ selectedFolder }: Props) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [shareFolderModalOpen, setShareFolderModalOpen] = useState(false);
	const [deleteFolderModalOpen, setDeleteFolderModalOpen] = useState(false);

	const handleClick = (e: MouseEvent) => {
		const ID = (e.target as HTMLButtonElement).id;
		if (ID === "share") setShareFolderModalOpen(true);
		if (ID === "editName") setEditModalOpen(true);
		if (ID === "delete") setDeleteFolderModalOpen(true);
	};

	return (
		<>
			{selectedFolder.id !== "ALL" && (
				<FolderOptions>
					<button onClick={handleClick} id="share">
						<Image src={shareIcon} alt="공유 버튼 이미지" />
						공유
					</button>
					<button onClick={handleClick} id="editName">
						<Image src={penIcon} alt="이름 변경 버튼 이미지" />
						이름 변경
					</button>
					<button onClick={handleClick} id="delete">
						<Image src={deleteIcon} alt="삭제 버튼 이미지" />
						삭제
					</button>
				</FolderOptions>
			)}
			{shareFolderModalOpen && (
				<ShareFolderModal
					setShareFolderModalOpen={setShareFolderModalOpen}
					selectedFolder={selectedFolder}
				/>
			)}
			{editModalOpen && (
				<EditFolderNameModal
					setEditModalOpen={setEditModalOpen}
					selectedFolder={selectedFolder}
				/>
			)}
			{deleteFolderModalOpen && (
				<DeleteFolderModal
					setDeleteFolderModalOpen={setDeleteFolderModalOpen}
					selectedFolder={selectedFolder}
				/>
			)}
		</>
	);
};

export default FolderOption;
