import styles from "./AddToFolderModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalBox, Ul } from "./style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent, useState } from "react";
import { FolderListDatum, postLink } from "../../apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	link: string;
	setAddToFolderModalOpen: (arg: boolean) => void;
	folders: FolderListDatum[];
	clearInput: () => void;
}

const AddToFolderModal = ({
	link,
	setAddToFolderModalOpen,
	folders,
	clearInput
}: Props) => {
	const [folderToAdd, setFolderToAdd] = useState("");

	const queryClient = useQueryClient();

	const linkMutation = useMutation({
		mutationKey: ["links", folderToAdd],
		mutationFn: () => postLink(link, folderToAdd),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["links"]
			});
			clearInput();
		}
	});

	const closeModal = (e: MouseEvent) => {
		e.preventDefault();
		setAddToFolderModalOpen(false);
	};

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		setFolderToAdd((e.target as HTMLLIElement).id);
	};

	const handleEvent = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handlePost = () => {
		linkMutation.mutate();
		setAddToFolderModalOpen(false);
	};

	return (
		<ModalBackground onClick={closeModal}>
			<ModalBox onClick={handleEvent}>
				<FontAwesomeIcon
					icon={faXmark}
					className="ModalX"
					onClick={closeModal}
				/>
				<p>폴더에 추가</p>
				<p className="link">{link}</p>
				<Ul>
					{folders.map(
						(folder) =>
							folder.name !== "전체" && (
								<li
									key={folder.id}
									id={folder.id.toString()}
									onClick={handleClick}
								>
									<span>{folder.name} </span>
									<span className="count">{folder.link_count}개 링크</span>
									{folder.id + "" === folderToAdd && (
										<span className="selected">✓</span>
									)}
								</li>
							)
					)}
				</Ul>
				<button onClick={handlePost} className={styles.button}>
					추가하기
				</button>
			</ModalBox>
		</ModalBackground>
	);
};

export default AddToFolderModal;
