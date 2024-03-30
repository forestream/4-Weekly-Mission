import { MouseEvent, useEffect, useRef, useState } from "react";
import {
	FolderListDatum,
	getSavedFolderList,
	getLinkData,
	LinkDatum
} from "@/apis/api";
import LinkItems from "@/component/LinkItems";
import { Container, FolderName } from "@/styles/Folder";
import FolderOption from "@/component/FolderOption";
import MobileAddFolderButton from "@/component/MobileAddFolderButton";
import BottomLinkAddInput from "@/component/BottomLinkAddInput";
import FolderList from "@/component/FolderList";
import LinkAddInput from "@/component/LinkAddInput";
import LinkSearchInput from "@/component/LinkSearchInput";
import { useRouter } from "next/router";

const ALL: FolderListDatum = {
	id: "ALL",
	name: "전체",
	favorite: false,
	created_at: "",
	link: {
		count: 0
	},
	user_id: 0
};

export async function getServerSideProps(context: any) {
	const { folderId } = context.query;
	const { data: folders } = await getSavedFolderList();
	folders.unshift(ALL);
	const { data: links } = await getLinkData(folderId);

	return {
		props: {
			folders,
			links
		}
	};
}

interface Props {
	folders: FolderListDatum[];
	links: LinkDatum[];
}

const FolderPage = ({ folders, links: initLinks }: Props) => {
	const router = useRouter();
	const [links, setLinks] = useState(initLinks);
	const [selectedFolder, setSelectedFolder] = useState<FolderListDatum>(ALL);
	const [isLoading, setIsLoading] = useState(false);
	const addLinkRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const [addLinkIntersecting, setAddLinkIntersecting] = useState(false);
	const [footerIntersecting, setFooterIntersecting] = useState(false);

	useEffect(() => {
		setLinks(initLinks);
	}, [initLinks]);

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		const folderClicked = (e.target as HTMLLIElement).id;
		const query = folderClicked === "ALL" ? "" : `?folderId=${folderClicked}`;
		router.push(query);

		const folderFound: any = folders.find(
			(item) => String(item.id) === folderClicked
		);
		setSelectedFolder(folderFound);
	};

	const handleSearchSubmit = (keyword: string) => {
		setLinks(
			initLinks.filter(
				(link) =>
					link.url?.includes(keyword) ||
					link.title?.includes(keyword) ||
					link.description?.includes(keyword)
			)
		);
	};

	// IntersectionObserver
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.target.id === "addLink")
				setAddLinkIntersecting(entry.isIntersecting);
			if (entry.target.id === "footer")
				setFooterIntersecting(entry.isIntersecting);
		});
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 0.4
		});

		if (addLinkRef.current && footerRef.current) {
			observer.observe(addLinkRef.current);
			observer.observe(footerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<div id="addLink" ref={addLinkRef}>
				<LinkAddInput folders={folders} />
			</div>
			<Container>
				<LinkSearchInput onSubmit={handleSearchSubmit} />
				<FolderList
					folders={folders}
					selectedFolder={selectedFolder}
					onClick={handleClick}
				/>
				<FolderName>
					{selectedFolder.name}
					<FolderOption selectedFolder={selectedFolder} />
				</FolderName>
				<LinkItems folders={folders} links={links} isLoading={isLoading} />
				<MobileAddFolderButton />
			</Container>
			{!addLinkIntersecting && !footerIntersecting && (
				<BottomLinkAddInput folders={folders} />
			)}
			<div id="footer" ref={footerRef}></div>
		</>
	);
};

export default FolderPage;
