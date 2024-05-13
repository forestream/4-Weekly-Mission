import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalBox } from "./style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FolderListDatum, deleteFolderById } from "../../apis/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
	setDeleteFolderModalOpen: (value: boolean) => void;
	selectedFolder: FolderListDatum;
	setSelectedFolder: (value: string) => void;
}
const DeleteFolderModal = ({
	setDeleteFolderModalOpen,
	selectedFolder,
	setSelectedFolder
}: Props) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: () => deleteFolderById(selectedFolder.id + ""),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
			setSelectedFolder("ALL");
			closeModal();
		}
	});

	const closeModal = () => {
		setDeleteFolderModalOpen(false);
	};

	const handleDelete = () => {
		deleteMutation.mutate();
	};

	return (
		<ModalBackground onClick={closeModal}>
			<ModalBox onClick={(e) => e.stopPropagation()}>
				<FontAwesomeIcon
					icon={faXmark}
					className="ModalX"
					onClick={closeModal}
				/>
				<p>폴더 삭제</p>
				<p className="folderName">{selectedFolder.name}</p>
				<button onClick={handleDelete}>삭제하기</button>
			</ModalBox>
		</ModalBackground>
	);
};

export default DeleteFolderModal;
