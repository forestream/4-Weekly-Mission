import { useState } from "react";
import { LinkDatum, getFolderById, getLinks, getUserById } from "@/apis/api";
import FolderOwner from "@/component/FolderOwner";
import LinkItems from "@/component/LinkItems";
import LinkSearchInput from "@/component/LinkSearchInput";
import { Container } from "@/styles/Shared";

export async function getServerSideProps(context: any) {
	const { folderId } = context.query;

	const [folder] = await getFolderById(folderId);

	const [owner] = await getUserById(folder.user_id);

	const links = await getLinks(folderId);

	return {
		props: {
			folder,
			owner,
			links
		}
	};
}

export interface Props {
	folder: {
		id: number;
		created_at: string;
		name: string;
		user_id: number;
		favorite: boolean;
	} | null;
	owner: {
		id: number;
		created_at: string;
		name: string;
		image_source: string;
		email: string;
		auth_id: string;
	};
	links: LinkDatum[];
}

const SharedPage = ({ folder, owner, links: initLinks }: Props) => {
	const [sharedLinks, setSharedLinks] = useState<LinkDatum[]>(initLinks);

	const handleSearchSubmit = (keyword: string) => {
		setSharedLinks(
			initLinks.filter(
				(link) =>
					link.url.includes(keyword) ||
					link.title.includes(keyword) ||
					link.description.includes(keyword)
			)
		);
	};

	if (!folder) return <p>저장된 링크가 없습니다.</p>;

	return (
		<>
			<FolderOwner name={folder.name} owner={owner} />
			<Container>
				<LinkSearchInput onSubmit={handleSearchSubmit} />
				<LinkItems folders={[]} links={sharedLinks} />
			</Container>
		</>
	);
};

export default SharedPage;
