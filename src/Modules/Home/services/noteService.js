import { baseURL } from "../../../../environment.product";
import api from "../../../config";

class NoteService {

  getNotesByUserId(userId){
    return api.get(`${baseURL}note/${userId}`);
  }

  createNote(note){
    return api.post(`${baseURL}note`, note);
  }

  updateNote(note){
    return api.patch(`${baseURL}note`, note);
  }

  deleteNote(data){
    return api.delete(`${baseURL}note`,  {
      data: data
    });
  }

  updateState(data){
    return api.patch(`${baseURL}note/update-status`, data)
  }

}

export default new NoteService();