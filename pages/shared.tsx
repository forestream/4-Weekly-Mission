import { useState } from "react";
import { SharedFolder, getSharedFolder } from "@/apis/api";
import FolderOwner from "@/component/FolderOwner";
import LinkItems from "@/component/LinkItems";
import LinkSearchInput from "@/component/LinkSearchInput";
import { Container } from "@/styles/Shared";

export async function getStaticProps() {
	const data = await getSharedFolder();
	const folderData = data.folder;
	const sharedLinks = data.folder.links;

	return {
		props: {
			folderData,
			sharedLinks
		}
	};
}

interface Props {
	folderData: SharedFolder["folder"] | null;
	sharedLinks: SharedFolder["folder"]["links"];
}

const SharedPage = ({ folderData, sharedLinks: initSharedLinks }: Props) => {
	const [sharedLinks, setSharedLinks] =
		useState<SharedFolder["folder"]["links"]>(initSharedLinks);

	const handleSearchSubmit = (keyword: string) => {
		setSharedLinks(
			initSharedLinks.filter(
				(link) =>
					link.url.includes(keyword) ||
					link.title.includes(keyword) ||
					link.description.includes(keyword)
			)
		);
	};

	if (!folderData) return <p>저장된 링크가 없습니다.</p>;

	return (
		<>
			<FolderOwner name={folderData.name} owner={folderData.owner} />
			<Container>
				<LinkSearchInput onSubmit={handleSearchSubmit} />
				<LinkItems folders={[]} links={sharedLinks} />
			</Container>
		</>
	);
};

export default SharedPage;
