import http from "../http-auth";
class UserServices {
  signUp(user) {
    return http.post("/users/signup", user);
  }

  login(creds) {
    return http.post("/users/login", creds);
  }

  adminlogin(creds) {
    return http.post("/users/adminlogin", creds);
  }

}

export default new UserServices();