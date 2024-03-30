import { useEffect, useState } from "react";
import { ProfileDatum, getProfileData } from "../../apis/api";
import styles from "./Profile.module.css";
import LoadingProfile from "./LoadingProfile";
import Image from "next/image";

const Profile = () => {
	const [user, setUser] = useState<ProfileDatum>({
		auth_id: "",
		created_at: "",
		email: "",
		id: 0,
		image_source: "",
		name: ""
	});

	const [isLoading, setIsLoading] = useState(true);

	const getData = async () => {
		try {
			setIsLoading(true);
			const data = await getProfileData();
			setUser(data.data[0]);
		} catch (error: any) {
			alert(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			{isLoading && <LoadingProfile />}
			{user ? (
				<div className={styles.Profile}>
					<div className={styles.ProfileImage}>
						<Image fill src={user.image_source} alt="사용자 프로필 이미지" />
					</div>
					<span>{user.email}</span>
				</div>
			) : (
				<div>
					<span className={styles.loginBtn}>로그인</span>
				</div>
			)}
		</>
	);
};

export default Profile;
