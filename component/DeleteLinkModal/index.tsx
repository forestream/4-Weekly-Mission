import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalBox } from "./style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "@/apis/api";

interface Props {
	url: string;
	setDeleteLinkModalOpen: (value: boolean) => void;
	linkId: string;
}

const DeleteLinkModal = ({ url, setDeleteLinkModalOpen, linkId }: Props) => {
	const queryClient = useQueryClient();

	const linkMutation = useMutation({
		mutationFn: () => deleteLink(linkId),
		onSuccess: () => queryClient.refetchQueries()
	});

	const closeModal = (e: MouseEvent) => {
		setDeleteLinkModalOpen(false);
		e.preventDefault();
	};

	const handleEvent = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handleDelete = () => {
		linkMutation.mutate();
		setDeleteLinkModalOpen(false);
	};

	return (
		<ModalBackground onClick={closeModal}>
			<ModalBox onClick={handleEvent}>
				<FontAwesomeIcon
					icon={faXmark}
					className="ModalX"
					onClick={closeModal}
				/>

				<p>링크 삭제</p>
				<p className="folderName">{url}</p>
				<button onClick={handleDelete}>삭제하기</button>
			</ModalBox>
		</ModalBackground>
	);
};

export default DeleteLinkModal;
