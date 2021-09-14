import axios from "axios";

const local = "http://localhost:5000";

const getToken = () => {
	const tokenString = localStorage.getItem("token");
	// const userToken = JSON.parse(tokenString);

	if (tokenString) {
		return tokenString;
	} else {
		return "";
	}
};
const backEndApi = axios.create({
	baseURL: local,
	headers: {
		"x-access-token": getToken(),
	},
});

export default backEndApi;
