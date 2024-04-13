import { useEffect, useRef, useState } from "react";
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
import instance from "@/lib/axios";

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
	let { folderId } = context.query;
	folderId = folderId === undefined ? "ALL" : folderId;
	// const { data } = await instance.get("/folders");
	// const folders = data.folder;

	const { data: folders } = await getSavedFolderList();
	folders.unshift(ALL);
	const { data: links } = await getLinkData(folderId);

	return {
		props: {
			folders,
			links,
			folderId
		}
	};
}

interface Props {
	folders: FolderListDatum[];
	links: LinkDatum[];
	folderId: string;
}

const FolderPage = ({ folders, folderId, links: initLinks }: Props) => {
	const [links, setLinks] = useState(initLinks);
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

	useEffect(() => {
		setLinks(initLinks);
	}, [initLinks]);

	const folderFound: any = folders.find((item) => String(item.id) === folderId);

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
			if (addLinkRef.current && footerRef.current) {
				console.log("exists");
				observer.unobserve(addLinkRef.current);
				observer.unobserve(footerRef.current);
			}
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
				<FolderList folders={folders} selectedFolder={folderFound} />
				<FolderName>
					{folderFound.name}
					<FolderOption selectedFolder={folderFound} />
				</FolderName>
				<LinkItems folders={folders} links={links} isLoading={false} />
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
