import { calculateTimePassed } from "../../../utils/calculateTimePassed";
import starButtonImg from "@/public/images/starButton.svg";
import { LinkImage, StarButton } from "../style";
import "../LinkItems.module.css";
import { MouseEvent, useRef, useState } from "react";
import Kebab from "../Kebab";
import {
	SharedFolderLink,
	LinkDatum,
	FolderListDatum
} from "../../../apis/api";
import Image from "next/image";
import styles from "./LinkItem.module.css";

interface Props {
	folders: FolderListDatum[];
	link: LinkDatum | SharedFolderLink;
}

const LinkItem = ({ folders, link }: Props) => {
	const [kebabOpen, setKebabOpen] = useState(false);

	const CREATED_AT = new Date(
		(link as SharedFolderLink).createdAt || (link as LinkDatum).created_at
	);
	const YEAR = CREATED_AT.getFullYear();
	const MONTH = CREATED_AT.getMonth() + 1;
	const DATE = CREATED_AT.getDate();
	const CREATED_DATE = `${YEAR}. ${MONTH}. ${DATE}`;

	const handleClick = (e: MouseEvent) => {
		e.preventDefault();
		setKebabOpen(!kebabOpen);
	};

	return (
		<a
			className={styles.LinkItem}
			href={link.url}
			target="_blank"
			rel="noreferrer"
		>
			<LinkImage
				data-image={
					(link as SharedFolderLink).imageSource ||
					(link as LinkDatum).image_source ||
					"images/card-default.png"
				}
			>
				<StarButton>
					<Image width={30} height={30} alt="즐겨찾기" src={starButtonImg} />
				</StarButton>
			</LinkImage>
			<div className={styles.createdAt}>
				{calculateTimePassed(CREATED_AT)}
				<Kebab
					folders={folders}
					onClick={handleClick}
					kebabOpen={kebabOpen}
					url={link.url}
				/>
			</div>
			<p className={styles.description}>{link.description}</p>
			<p className={styles.createdDate}>{CREATED_DATE}</p>
		</a>
	);
};

export default LinkItem;
