import { baseURL } from "../../../../environment.product";
import api from "../../../config/index";
import tokenService from "./tokenService";

class AuthService {
  login = async (data) => {
    return api.post(`${baseURL}login`, data);
  };

  logout() {
    tokenService.removeUser();
  }

  getCurrentUser() {
    return tokenService.getUser();
  }
}

export default new AuthService();