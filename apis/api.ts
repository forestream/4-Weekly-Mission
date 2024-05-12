import { BASE_URL } from "./constants";

// getProfileData
export type ProfileDatum = {
	auth_id: string;
	created_at: string;
	email: string;
	id: number;
	image_source: string;
	name: string;
};

export type Profile = {
	data: ProfileDatum[];
};

// getFolderData
export type SharedFolderLink = {
	createdAt: string;
	description: string;
	id: number;
	imageSource: string;
	title: string;
	url: string;
};

type Owner = {
	id: number;
	name: string;
	profileImageSource: string;
};

export type SharedFolder = {
	folder: {
		count: number;
		id: number;
		links: SharedFolderLink[];
		name: string;
		owner: Owner;
	};
};

// getSavedFolderList
export type FolderListDatum = {
	created_at: string;
	favorite: boolean;
	id: number | "ALL";
	link: {
		count: number;
	};
	name: string;
	user_id: number;
};

export type FolderList = {
	data: FolderListDatum[];
};

// getLinkData
export type LinkDatum = {
	created_at: string;
	description: string;
	folder_id: number;
	id: number;
	image_source: string;
	title: string;
	updated_at: string;
	url: string;
};

export type LinkData = {
	data: LinkDatum[];
};

export const postUser = async (user: any): Promise<any> => {
	const response = await fetch(`${BASE_URL}/auth/sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(user)
	});
	return await response.json();
};

export const getFolders = async () => {
	const response = await fetch(`${BASE_URL}/folders`, {
		headers: {
			Authorization:
				"Bearer " +
				"eyJhbGciOiJIUzI1NiIsImtpZCI6IktLNE05TGFmMXkzWEI0M0kiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE2MDA5MjcxLCJpYXQiOjE3MTU0MDQ0NzEsImlzcyI6Imh0dHBzOi8vanB2ZG9weWdibHJlZnpvbmV2ZnEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjY3YzAxNzRjLTE5MmMtNGUwMS05MTEzLWQ3MmJhOGY5MDRiZSIsImVtYWlsIjoid293bUB2bGRrc2guY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Indvd21Admxka3NoLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI2N2MwMTc0Yy0xOTJjLTRlMDEtOTExMy1kNzJiYThmOTA0YmUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxNTQwNDQ3MX1dLCJzZXNzaW9uX2lkIjoiODQ1MjBjZWMtMzY1ZS00Yjk5LTkzMWQtNTc3MGZmNjA3MTM1IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.EXiNVzDFZz7wkZ0Q37GA1L0uaGW420NC6r5Flu7wbbw"
		}
	});
	return await response.json();
};

export const getAllLinks = async () => {
	const response = await fetch(`${BASE_URL}/links`, {
		headers: {
			Authorization:
				"Bearer " +
				"eyJhbGciOiJIUzI1NiIsImtpZCI6IktLNE05TGFmMXkzWEI0M0kiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE2MDA5MjcxLCJpYXQiOjE3MTU0MDQ0NzEsImlzcyI6Imh0dHBzOi8vanB2ZG9weWdibHJlZnpvbmV2ZnEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjY3YzAxNzRjLTE5MmMtNGUwMS05MTEzLWQ3MmJhOGY5MDRiZSIsImVtYWlsIjoid293bUB2bGRrc2guY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Indvd21Admxka3NoLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI2N2MwMTc0Yy0xOTJjLTRlMDEtOTExMy1kNzJiYThmOTA0YmUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxNTQwNDQ3MX1dLCJzZXNzaW9uX2lkIjoiODQ1MjBjZWMtMzY1ZS00Yjk5LTkzMWQtNTc3MGZmNjA3MTM1IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.EXiNVzDFZz7wkZ0Q37GA1L0uaGW420NC6r5Flu7wbbw"
		}
	});
	return await response.json();
};

export const getLinks = async (folderId: string) => {
	if (folderId === "ALL") {
		return await getAllLinks();
	}

	const response = await fetch(`${BASE_URL}/folders/${folderId}/links`);
	return await response.json();
};

export const getFolderById = async (folderId: string) => {
	const response = await fetch(`${BASE_URL}/folders/${folderId}`);
	return await response.json();
};

export const getUserById = async (userId: string) => {
	const response = await fetch(`${BASE_URL}/users/${userId}`);
	return await response.json();
};

// part3 api
export const getProfileData = async (): Promise<Profile> => {
	try {
		const response = await fetch(`${BASE_URL}/users/1`);

		if (!response.ok) {
			throw new Error(`${response.status} 에러`);
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw error;
	}
};

export const getLinkData = async (
	selectedFolderId: string | "ALL"
): Promise<LinkData> => {
	const query =
		selectedFolderId && selectedFolderId !== "ALL"
			? `?folderId=${selectedFolderId}`
			: ``;

	const response = await fetch(`${BASE_URL}/users/1/links${query}`);

	if (!response.ok) {
		throw new Error("링크 정보를 불러오는데 실패했습니다.");
	}

	const data = await response.json();

	return data;
};
