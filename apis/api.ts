import { BASE_URL } from "./constants";

const TEMP_AUTH =
	"Bearer " +
	"eyJhbGciOiJIUzI1NiIsImtpZCI6IktLNE05TGFmMXkzWEI0M0kiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE2MDA5MjcxLCJpYXQiOjE3MTU0MDQ0NzEsImlzcyI6Imh0dHBzOi8vanB2ZG9weWdibHJlZnpvbmV2ZnEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjY3YzAxNzRjLTE5MmMtNGUwMS05MTEzLWQ3MmJhOGY5MDRiZSIsImVtYWlsIjoid293bUB2bGRrc2guY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Indvd21Admxka3NoLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI2N2MwMTc0Yy0xOTJjLTRlMDEtOTExMy1kNzJiYThmOTA0YmUifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxNTQwNDQ3MX1dLCJzZXNzaW9uX2lkIjoiODQ1MjBjZWMtMzY1ZS00Yjk5LTkzMWQtNTc3MGZmNjA3MTM1IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.EXiNVzDFZz7wkZ0Q37GA1L0uaGW420NC6r5Flu7wbbw";

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

export type FolderListDatum = {
	id: number | "ALL";
	created_at: string;
	favorite: boolean;
	name: string;
	link_count: number;
};

export type FolderList = {
	data: FolderListDatum[];
};

// getLinkData
export type LinkDatum = {
	id: number;
	favorite: boolean;
	created_at: string;
	url: string;
	title: string;
	image_source: string;
	description: string;
	folder_id: number;
	updated_at: string;
};

export type LinkData = {
	data: LinkDatum[];
};

export type User = {
	email: string;
	password: string;
};

export const postUser = async (user: User): Promise<any> => {
	const response = await fetch(`${BASE_URL}/auth/sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	return await response.json();
};

export const postSignup = async (user: User) => {
	const response = await fetch(`${BASE_URL}/auth/sign-up`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	});
	return await response.json();
};

export const getFolders = async () => {
	const ALL: FolderListDatum = {
		id: "ALL",
		name: "전체",
		favorite: false,
		created_at: "",
		link_count: 0,
	};

	const response = await fetch(`${BASE_URL}/folders`, {
		headers: {
			Authorization: TEMP_AUTH,
		},
	});
	const folders = await response.json();
	folders.unshift(ALL);
	return folders;
};

export const getAllLinks = async () => {
	const response = await fetch(`${BASE_URL}/links`, {
		headers: {
			Authorization: TEMP_AUTH,
		},
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

export const putFolderById = async (folderId: string, name: string) => {
	const response = await fetch(`${BASE_URL}/folders/${folderId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: TEMP_AUTH,
		},
		body: JSON.stringify({ name }),
	});
	return await response.json();
};

export const postFolder = async (name: string) => {
	const response = await fetch(`${BASE_URL}/folders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: TEMP_AUTH,
		},
		body: JSON.stringify({ name }),
	});
	return await response.json();
};

export const deleteFolderById = async (folderId: string) => {
	await fetch(`${BASE_URL}/folders/${folderId}`, {
		method: "DELETE",
		headers: {
			Authorization: TEMP_AUTH,
		},
	});
};

export const postLink = async (url: string, folderId: string) => {
	const response = await fetch(`${BASE_URL}/links`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: TEMP_AUTH,
		},
		body: JSON.stringify({ url, folderId }),
	});
	return await response.json();
};

export const deleteLink = async (linkId: string) => {
	await fetch(`${BASE_URL}/links/${linkId}`, {
		method: "DELETE",
		headers: {
			Authorization: TEMP_AUTH,
		},
	});
};
