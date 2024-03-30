import { SharedFolderLink, LinkDatum, FolderListDatum } from "../../apis/api";
import LinkItem from "./LinkItem";
import styles from "./LinkItems.module.css";
import LinkSkeleton from "./LinkSkeleton";
import { LinkImageLoading, LinkLoading, LoadingAnimation } from "./style";

interface Props {
	folders?: FolderListDatum[];
	links: (SharedFolderLink | LinkDatum)[];
	isLoading?: boolean;
}

const LinkItems = ({ folders, links = [], isLoading }: Props) => {
	if (isLoading) {
		return (
			<div className={styles.LinkItems}>
				<LinkSkeleton />
			</div>
		);
	}

	return (
		<div className={styles.LinkItems}>
			{links.map((link) => (
				<LinkItem folders={folders} key={link.id} link={link} />
			))}
			{links.length !== 0 || <div>저장된 링크가 없습니다.</div>}
		</div>
	);
};

export default LinkItems;
