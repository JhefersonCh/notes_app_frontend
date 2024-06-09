import api from "../../../config";
import { baseURL } from "../../../../environment.develpment";

class UserSerice {

  createUser (user) {
    return api.post(`${baseURL}user`, user)
  }

}

export default new UserSerice();