import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalBox } from "./style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFolder } from "@/apis/api";

const AddFolderModal = ({
	setAddFolderModalOpen
}: {
	setAddFolderModalOpen: (arg: boolean) => void;
}) => {
	const [value, setValue] = useState("");

	const queryClient = useQueryClient();
	const addMutation = useMutation({
		mutationFn: () => postFolder(value),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
			closeModal();
		}
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const closeModal = () => {
		setAddFolderModalOpen(false);
	};

	const handlePost = () => {
		addMutation.mutate();
	};

	return (
		<ModalBackground onClick={closeModal}>
			<ModalBox onClick={(e) => e.stopPropagation()}>
				<FontAwesomeIcon
					icon={faXmark}
					className="ModalX"
					onClick={closeModal}
				/>
				<p>폴더 추가</p>
				<input
					onChange={handleChange}
					value={value}
					placeholder="내용 입력"
					onKeyUp={(e) => {
						if (e.key === "Enter") handlePost();
					}}
				/>
				<button onClick={handlePost}>추가하기</button>
			</ModalBox>
		</ModalBackground>
	);
};

export default AddFolderModal;
