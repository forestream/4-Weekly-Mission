import { Ul, Container } from "./style";
import AddFolder from "./AddFolder";
import { FolderListDatum } from "../../apis/api";
import { MouseEvent } from "react";

interface Props {
  folders: FolderListDatum[];
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
  selectedFolder: FolderListDatum;
}

const FolderList = ({ folders, onClick, selectedFolder }: Props) => {
  const handleClick = (e: MouseEvent<HTMLLIElement>) => onClick(e);

  return (
    <Container>
      <Ul>
        {folders.map((item) => (
          <li
            key={item.id}
            id={item.id.toString()}
            onClick={handleClick}
            className={`${selectedFolder.id === item.id ? "selected" : ""}`}
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
