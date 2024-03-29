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

const FolderPage = () => {
	const [folders, setFolders] = useState<FolderListDatum[]>([]);
	const [selectedFolder, setSelectedFolder] = useState<FolderListDatum>(ALL);
	const [links, setLinks] = useState<LinkDatum[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const addLinkRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const [addLinkIntersecting, setAddLinkIntersecting] = useState(false);
	const [footerIntersecting, setFooterIntersecting] = useState(false);

	useEffect(() => {
		const getData = async () => {
			try {
				setIsLoading(true);
				const { data } = await getSavedFolderList();
				setFolders([ALL, ...data]);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		const findFolder: any = folders.find(
			(item) => String(item.id) === (e.target as HTMLLIElement).id
		);

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

	const handleSearchSubmit = (keyword: string) => {
		setLinks(
			links.filter(
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
