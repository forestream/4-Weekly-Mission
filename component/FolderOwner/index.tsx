import styled from "styled-components";
import styles from "./FolderOwner.module.css";
import Image from "next/image";
import { Props as FolderIdProps } from "@/pages/shared/[folderId]";

const SharedPageName = styled.div`
	font-size: 2.5rem;
	font-weight: 600;
`;

interface Props {
	name: string;
	owner: FolderIdProps["ownerData"];
}

const FolderOwner = ({ name, owner }: Props) => {
	return (
		<div className={styles.FolderOwner}>
			<Image
				width={40}
				height={40}
				src={owner.image_source}
				alt="폴더 소유자 프로필 이미지"
			/>
			<div>{owner.name}</div>
			<SharedPageName>{name}</SharedPageName>
		</div>
	);
};

export default FolderOwner;
