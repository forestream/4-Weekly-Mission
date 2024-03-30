import { useEffect, useState } from "react";
import { ProfileDatum, getProfileData } from "../../apis/api";
import styles from "./Profile.module.css";
import LoadingProfile from "./LoadingProfile";
import Image from "next/image";

const Profile = () => {
	const [user, setUser] = useState<ProfileDatum | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const getData = async () => {
		try {
			setIsLoading(true);
			const data = await getProfileData();
			setUser(data.data[0]);
		} catch (error: any) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	if ((!isLoading && !user) || isError) {
		return (
			<div>
				<span className={styles.loginBtn}>로그인</span>
			</div>
		);
	}

	return (
		<>
			{isLoading && <LoadingProfile />}
			{user && (
				<div className={styles.Profile}>
					<div className={styles.ProfileImage}>
						<Image
							fill
							src={(user as ProfileDatum).image_source}
							alt="사용자 프로필 이미지"
						/>
					</div>
					<span>{(user as ProfileDatum).email}</span>
				</div>
			)}
		</>
	);
};

export default Profile;
