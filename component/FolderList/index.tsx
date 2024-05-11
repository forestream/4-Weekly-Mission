import { Ul, Container } from "./style";
import AddFolder from "./AddFolder";
import { FolderListDatum } from "../../apis/api";
import { MouseEvent } from "react";

interface Props {
	folders: FolderListDatum[];
	selectedFolder: FolderListDatum;
	onClick: (folderId: string) => void;
}

const FolderList = ({ folders, selectedFolder, onClick }: Props) => {
	if (!folders) {
		return <></>;
	}

	const handleClick = (e: MouseEvent) => {
		onClick((e.target as Element).id);
	};

	return (
		<Container>
			<Ul>
				{folders.map((item) => (
					<li
						key={item.id}
						id={item.id.toString()}
						className={`${selectedFolder.id === item.id ? "selected" : ""}`}
						onClick={handleClick}
					>
						{item.name}
					</li>
				))}
			</Ul>
			<AddFolder />
		</Container>
	);
};

export default FolderList;
