import http from "../http-common";

class IPOServices{

  getAllIpos(){
    return http.get("/ipos");
  }

  getIpoById(id){
    return http.get(`/ipos/${id}`);
  }

  addIpo(ipo){
    return http.post("/ipos/add",ipo);
  }

  updateIpo(ipo){
    return http.put("/ipos/update",ipo);
  }

  deleteIpo(id){
    return http.delete(`/ipos/delete/${id}`);
  }

}

export default new IPOServices();