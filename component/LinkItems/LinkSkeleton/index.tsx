import { LinkImageLoading, LinkLoading, LoadingAnimation } from "../style";
import styles from "./LinkSkeleton.module.css";

const LinkSkeleton = () => {
	return (
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
			<LoadingAnimation>
				<div className={styles.Loading}>
					<LinkImageLoading />
					<LinkLoading />
					<LinkLoading />
				</div>
			</LoadingAnimation>
		</>
	);
};

export default LinkSkeleton;
