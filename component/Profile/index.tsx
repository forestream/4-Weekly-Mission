import { useEffect, useState } from "react";
import { ProfileDatum, getProfileData } from "../../apis/api";
import styles from "./Profile.module.css";
import LoadingProfile from "./LoadingProfile";
import Image from "next/image";
import Link from "next/link";
import instance from "@/lib/axios";

/* 로컬스토리지에 저장해둔 토큰의 유무로 로그인 상태를 파악한다면 getserversideprops로는 유저정보를 가져올 수 없나요? 
 일단 컴포넌트 안에서 CSR로 구현해보겠습니다.
 생각해 본 바, SSR로 프로필 데이터를 가져오려면 URL 쿼리로 액세스토큰값 전체를 넣어줄 수 있지 않을까.
 그런데 그게 보안에 좋은지?
 */

const Profile = () => {
	const [user, setUser] = useState<ProfileDatum | null>(null);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const getData = async () => {
		try {
			setIsLoading(true);
			const res = await instance.get("/users", {
				headers: { Authorization: window.localStorage.getItem("accessToken") }
			});
			console.log(res);
			// const data = await getProfileData();
			setUser(res.data.data[0]);
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
			<Link href="/signin">
				<span className={styles.loginBtn}>로그인</span>
			</Link>
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
