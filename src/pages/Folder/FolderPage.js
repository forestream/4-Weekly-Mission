import FolderList from "../../component/FolderList";
import LinkAddInput from "../../component/LinkAddInput";
import LinkSearchInput from "../../component/LinkSearchInput";
import { useEffect, useState } from "react";
import { getFolderList, getLinkData } from "../../apis/api";
import LinkItems from "../../component/LinkItems";
import { Container, FolderName } from "./style";
import FolderOption from "../../component/FolderOption";
import MobileAddFolderButton from "../../component/MobileAddFolderButton";

const ALL = {
  id: "ALL",
  name: "전체",
  favorite: false,
};

const FolderPage = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(ALL);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getFolderList();
        setFolders([ALL, ...data]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleClick = (e) => {
    const findFolder = folders.find((item) => String(item.id) === e.target.id);

    setSelectedFolder(findFolder);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await getLinkData(selectedFolder.id);
        setLinks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [selectedFolder]);

  return (
    <>
      <LinkAddInput folders={folders} />
      <Container>
        <LinkSearchInput />
        <FolderList
          folders={folders}
          selectedFolder={selectedFolder}
          onClick={handleClick}
          isLoading={isLoading}
        />
        <FolderName>
          {selectedFolder.name}
          <FolderOption selectedFolder={selectedFolder} />
        </FolderName>

        <LinkItems folders={folders} links={links} isLoading={isLoading} />
        <MobileAddFolderButton />
      </Container>
    </>
  );
};

export default FolderPage;
