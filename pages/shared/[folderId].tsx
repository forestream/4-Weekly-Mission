import { useState } from "react";
import { LinkDatum, SharedFolder, getSharedFolder } from "@/apis/api";
import FolderOwner from "@/component/FolderOwner";
import LinkItems from "@/component/LinkItems";
import LinkSearchInput from "@/component/LinkSearchInput";
import { Container } from "@/styles/Shared";
import instance from "@/lib/axios";

export async function getServerSideProps(context: any) {
	const { folderId } = context.query;
	const { data: folder } = await instance.get(`/folders/${folderId}`);
	const folderData = folder.data[0];

	const { data: owner } = await instance.get(`/users/${folderData.user_id}`);
	const ownerData = owner.data[0];

	const { data: links } = await instance.get(
		`/users/${folderData.user_id}/links?folderId=${folderId}`
	);
	const linksData = links.data;

	return {
		props: {
			folderData,
			ownerData,
			linksData
		}
	};
}

export interface Props {
	folderData: {
		id: number;
		created_at: string;
		name: string;
		user_id: number;
		favorite: boolean;
	} | null;
	ownerData: {
		id: number;
		created_at: string;
		name: string;
		image_source: string;
		email: string;
		auth_id: string;
	};
	linksData: LinkDatum[];
}

const SharedPage = ({
	folderData,
	ownerData,
	linksData: initLinksData
}: Props) => {
	const [sharedLinks, setSharedLinks] = useState<LinkDatum[]>(initLinksData);

	const handleSearchSubmit = (keyword: string) => {
		setSharedLinks(
			initLinksData.filter(
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
			<FolderOwner name={folderData.name} owner={ownerData} />
			<Container>
				<LinkSearchInput onSubmit={handleSearchSubmit} />
				<LinkItems folders={[]} links={sharedLinks} />
			</Container>
		</>
	);
};

export default SharedPage;
