import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalBackground, ModalBox } from "./style";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FolderListDatum } from "../../apis/api";

interface Props {
  setDeleteFolderModalOpen: (value: boolean) => void;
  selectedFolder: FolderListDatum;
}
const DeleteFolderModal = ({
  setDeleteFolderModalOpen,
  selectedFolder,
}: Props) => {
  const closeModal = () => {
    setDeleteFolderModalOpen(false);
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
        <button onClick={closeModal}>삭제하기</button>
      </ModalBox>
    </ModalBackground>
  );
};

export default DeleteFolderModal;
