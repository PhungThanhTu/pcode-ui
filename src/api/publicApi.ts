import axios from 'axios';

const publicApi = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
	timeout: 15000
});

export default publicApi;
