import axios from "axios";
import User from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

//Login
export function checkUser(userToCheck: User) {
	return axios.get(
		`${api}?email=${userToCheck.email}&password=${userToCheck.password}`
	);
}

//Register
export function registerNew(newUser: User) {
	return axios.post(api, newUser);
}
