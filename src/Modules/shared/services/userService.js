import api from "../../../config";
import { baseURL } from "../../../../environment.product";

class UserSerice {

  createUser (user) {
    return api.post(`${baseURL}user`, user)
  }

}

export default new UserSerice();