import styled from "styled-components";
import styles from "./FolderOwner.module.css";
import Image from "next/image";

const SharedPageName = styled.div`
	font-size: 2.5rem;
	font-weight: 600;
`;

const FolderOwner = ({
	name,
	owner
}: {
	name: string;
	owner: {
		id: number;
		name: string;
		profileImageSource: string;
	};
}) => {
	return (
		<div className={styles.FolderOwner}>
			<div style={{ position: "relative", width: "100%", height: "100%" }}>
				<Image
					fill
					src={owner.profileImageSource}
					alt="폴더 소유자 프로필 이미지"
				/>
			</div>
			<div>{owner.name}</div>
			<SharedPageName>{name}</SharedPageName>
		</div>
	);
};

export default FolderOwner;
