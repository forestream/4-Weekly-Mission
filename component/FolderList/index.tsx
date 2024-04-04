import { Ul, Container } from "./style";
import AddFolder from "./AddFolder";
import { FolderListDatum } from "../../apis/api";
import { MouseEvent } from "react";
import Link from "next/link";

interface Props {
  folders: FolderListDatum[];
  selectedFolder: FolderListDatum;
}

const FolderList = ({ folders, selectedFolder }: Props) => {
  return (
    <Container>
      <Ul>
        {folders.map((item) => (
          <Link href={item.id === "ALL" ? "" : `?folderId=${item.id}`}>
            <li
              key={item.id}
              id={item.id.toString()}
              className={`${selectedFolder.id === item.id ? "selected" : ""}`}
            >
              {item.name}
            </li>
          </Link>
        ))}
      </Ul>
      <AddFolder />
    </Container>
  );
};

export default FolderList;
