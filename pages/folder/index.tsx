import { useEffect, useRef, useState } from "react";
import {
	FolderListDatum,
	LinkDatum,
	getFolders,
	getAllLinks,
	getLinks
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
import instance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

instance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem("accessToken");
	return config;
});

export async function getServerSideProps() {
	const folders = await getFolders();

	const links = await getAllLinks();

	return {
		props: {
			folders,
			links,
			folderId: ALL.id
		}
	};
}

interface Props {
	folders: FolderListDatum[];
	links: LinkDatum[];
	folderId: string;
}

const FolderPage = ({ folders, folderId, links: initLinks }: Props) => {
	const [links, setLinks] = useState<LinkDatum[]>(initLinks);
	const [selectedFolder, setSelectedFolder] = useState(folderId);
	const addLinkRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const [addLinkIntersecting, setAddLinkIntersecting] = useState(false);
	const [footerIntersecting, setFooterIntersecting] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!window.localStorage.getItem("accessToken")) {
			router.push("/signin");
		}
	}, [router]);

	const { data: fetchedFolders } = useQuery({
		queryKey: ["folders"],
		queryFn: () => getFolders(),
		initialData: folders
	});

	const {
		data: fetchedLinks,
		isFetching,
		isSuccess
	} = useQuery({
		queryKey: ["links", selectedFolder],
		queryFn: () => getLinks(selectedFolder),
		initialData: initLinks
	});

	useEffect(() => {
		if (isSuccess) {
			setLinks(fetchedLinks);
		}
	}, [fetchedLinks, isSuccess]);

	const folderFound: any = fetchedFolders.find(
		(item) => String(item.id) === selectedFolder
	);

	const handleSearchSubmit = (keyword: string) => {
		if (!keyword) {
			setLinks(fetchedLinks);
			return;
		}

		setLinks(
			fetchedLinks.filter(
				(link: LinkDatum) =>
					link.url?.includes(keyword) ||
					link.title?.includes(keyword) ||
					link.description?.includes(keyword)
			)
		);
	};

	// Intersection Observer
	const handleIntersect = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.target.id === "addLink")
				setAddLinkIntersecting(entry.isIntersecting);
			if (entry.target.id === "footer")
				setFooterIntersecting(entry.isIntersecting);
		});
	};

	useEffect(() => {
		const addLink = addLinkRef.current;
		const footer = footerRef.current;

		const observer = new IntersectionObserver(handleIntersect, {
			threshold: 0.4
		});

		if (addLink && footer) {
			observer.observe(addLink);
			observer.observe(footer);
		}

		return () => {
			if (addLink && footer) {
				observer.unobserve(addLink);
				observer.unobserve(footer);
			}
			observer.disconnect();
		};
	}, []);

	const handleClick = (newFolderId: string) => {
		setSelectedFolder(newFolderId);
	};

	return (
		<>
			<div id="addLink" ref={addLinkRef}>
				<LinkAddInput folders={fetchedFolders} />
			</div>
			<Container>
				<LinkSearchInput onSubmit={handleSearchSubmit} />
				<FolderList
					folders={fetchedFolders}
					selectedFolder={folderFound}
					onClick={handleClick}
				/>
				<FolderName>
					{folderFound.name}
					<FolderOption selectedFolder={folderFound} />
				</FolderName>
				<LinkItems
					folders={fetchedFolders}
					links={links}
					isLoading={isFetching}
				/>
				<MobileAddFolderButton />
			</Container>
			{!addLinkIntersecting && !footerIntersecting && (
				<BottomLinkAddInput folders={fetchedFolders} />
			)}
			<div id="footer" ref={footerRef}></div>
		</>
	);
};

export default FolderPage;
