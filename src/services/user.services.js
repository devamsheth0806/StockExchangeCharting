import reactSessionApi from "react-session-api";
import http from "../http-auth";
class UserServices {

  setDefaultHeaders(){
    http.defaults.headers = {
      "Content-type": "application/json"
    }
  }

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": reactSessionApi.get("Authorization"),
      "Username": reactSessionApi.get("Username"),
      "Role": reactSessionApi.get("Role")
    }
  }

  getAllUsers(){
    this.setHeaders();
    return http.get("/users/");
  }

  signUp(user) {
    this.setDefaultHeaders();
    return http.post("/users/signup", user);
  }

  login(creds) {
    this.setDefaultHeaders();
    return http.post("/users/login", creds);
  }

  adminlogin(creds) {
    this.setDefaultHeaders();
    return http.post("/users/adminlogin", creds);
  }

  deleteUser(id){
    this.setHeaders();
    return http.delete(`/users/delete/${id}`);
  }

}

export default new UserServices();