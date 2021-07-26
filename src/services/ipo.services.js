import reactSessionApi from "react-session-api";
import http from "../http-common";

class IPOServices{

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": reactSessionApi.get("Authorization"),
      "Username": reactSessionApi.get("Username"),
      "Role": reactSessionApi.get("Role")
    }
  }

  getAllIpos(){
    this.setHeaders();
    return http.get("/ipos");
  }

  getIpoById(id){
    this.setHeaders();
    return http.get(`/ipos/${id}`);
  }

  addIpo(ipo){
    this.setHeaders();
    return http.post("/ipos/add",ipo);
  }

  updateIpo(ipo){
    this.setHeaders();
    return http.put("/ipos/update",ipo);
  }

  deleteIpo(id){
    this.setHeaders();
    return http.delete(`/ipos/delete/${id}`);
  }

}

export default new IPOServices();