import { SharedFolderLink, LinkDatum, FolderListDatum } from "../../apis/api";
import LinkItem from "./LinkItem";
import styles from "./LinkItems.module.css";
import LinkSkeleton from "./LinkSkeleton";

interface Props {
	folders: FolderListDatum[];
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

	if (!links.length) {
		return <div className={styles.NoLink}>저장된 링크가 없습니다.</div>;
	}

	return (
		<div className={styles.LinkItems}>
			{links.map((link) => (
				<LinkItem folders={folders} key={link.id} link={link} />
			))}
		</div>
	);
};

export default LinkItems;
