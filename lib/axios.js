import axios from "axios";

const instance = axios.create({
	baseURL: "https://bootcamp-api.codeit.kr/api"
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem("accessToken");
	return config;
});

export default instance;
