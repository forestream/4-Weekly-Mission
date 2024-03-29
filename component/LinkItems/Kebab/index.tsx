import {
	AddToFolder,
	Container,
	Delete,
	KebabButton,
	KebabMenuBox
} from "./style";
import kebabImg from "@/public/images/kebab.svg";
import { MouseEvent, useState } from "react";
import DeleteLinkModal from "../../DeleteLinkModal";
import AddToFolderModal from "../../AddToFolderModal";
import { FolderListDatum } from "../../../apis/api";

interface Props {
	folders: FolderListDatum[];
	url: string;
	onClick: (e: MouseEvent) => void;
	kebabOpen: boolean;
}

const Kebab = ({ folders, url, onClick, kebabOpen }: Props) => {
	const [deleteLinkModalOpen, setDeleteLinkModalOpen] = useState(false);
	const [addToFolderModalOpen, setAddToFolderModalOpen] = useState(false);

	const handleClick = (e: MouseEvent) => {
		if ((e.target as HTMLDivElement).id === "delete")
			setDeleteLinkModalOpen(true);
		if ((e.target as HTMLDivElement).id === "addToFolder")
			setAddToFolderModalOpen(true);
	};

	return (
		<>
			<Container>
				<KebabButton src={kebabImg} onClick={onClick} />
				<KebabMenuBox data-kebabopen={kebabOpen.toString()} onClick={onClick}>
					<Delete id="delete" onClick={handleClick}>
						삭제하기
					</Delete>
					<AddToFolder id="addToFolder" onClick={handleClick}>
						폴더에 추가
					</AddToFolder>
				</KebabMenuBox>
			</Container>
			{deleteLinkModalOpen && (
				<DeleteLinkModal
					url={url}
					setDeleteLinkModalOpen={setDeleteLinkModalOpen}
				/>
			)}
			{addToFolderModalOpen && (
				<AddToFolderModal
					link={url}
					setAddToFolderModalOpen={setAddToFolderModalOpen}
					folders={folders}
				/>
			)}
		</>
	);
};

export default Kebab;
