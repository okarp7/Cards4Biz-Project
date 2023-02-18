import axios from "axios";
import User from "../interfaces/User";

const api: string = process.env.REACT_APP_API + "/users" || "";


export function checkUser(userCheck: User) {
  return axios.get(
    `${api}?email=${userCheck.email}&password=${userCheck.password}`
  );
}


export function addUser(userToAdd: User) {
  return axios.post(api, userToAdd);
}
