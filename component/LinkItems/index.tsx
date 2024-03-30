import { SharedFolderLink, LinkDatum, FolderListDatum } from "../../apis/api";
import LinkItem from "./LinkItem";
import styles from "./LinkItems.module.css";
import { LinkImageLoading, LinkLoading, LoadingAnimation } from "./style";

interface Props {
	folders?: FolderListDatum[];
	links: (SharedFolderLink | LinkDatum)[];
	isLoading?: boolean;
}

const LinkItems = ({ folders, links = [], isLoading }: Props) => {
	return (
		<div className={styles.LinkItems}>
			{isLoading ? (
				<>
					<LoadingAnimation>
						<div className={styles.Loading}>
							<LinkImageLoading />
							<LinkLoading />
							<LinkLoading />
						</div>
					</LoadingAnimation>
					<LoadingAnimation>
						<div className={styles.Loading}>
							<LinkImageLoading />
							<LinkLoading />
							<LinkLoading />
						</div>
					</LoadingAnimation>
				</>
			) : (
				links.map((link) => (
					<LinkItem folders={folders} key={link.id} link={link} />
				))
			)}
			{isLoading || links.length !== 0 || <div>저장된 링크가 없습니다.</div>}
		</div>
	);
};

export default LinkItems;
