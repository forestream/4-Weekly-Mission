import { ChangeEvent, useState } from "react";
import styles from "./EditFolderNameModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalBackground } from "./style";
import { FolderListDatum, putFolderById } from "../../apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	setEditModalOpen: (value: boolean) => void;
	selectedFolder: FolderListDatum;
}

const EditFolderNameModal = ({ setEditModalOpen, selectedFolder }: Props) => {
	const [name, setName] = useState(selectedFolder.name);
	const queryClient = useQueryClient();
	const folderMutation = useMutation({
		mutationKey: ["folder", name],
		mutationFn: () => putFolderById(selectedFolder.id + "", name),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["folders"]
			});
		}
	});

	const closeModal = () => {
		setEditModalOpen(false);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleEdit = () => {
		folderMutation.mutate();
		closeModal();
	};

	return (
		<ModalBackground onMouseDown={closeModal}>
			<div
				className={styles.EditModal}
				onMouseDown={(e) => {
					e.stopPropagation();
				}}
			>
				<FontAwesomeIcon
					icon={faXmark}
					className={styles.EditModalX}
					onClick={closeModal}
				/>
				<p className={styles.EditModalText}>폴더 이름 변경</p>
				<input
					className={styles.EditModalInput}
					onChange={handleChange}
					onKeyUp={(e) => {
						if (e.key === "Enter") handleEdit();
					}}
					value={name}
				/>
				<button className={styles.EditModalButton} onClick={handleEdit}>
					변경하기
				</button>
			</div>
		</ModalBackground>
	);
};

export default EditFolderNameModal;
