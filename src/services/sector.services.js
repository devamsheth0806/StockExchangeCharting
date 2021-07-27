import http from "../http-common";

class SectorServices{

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": sessionStorage.getItem("Authorization"),
      "Username": sessionStorage.getItem("Username"),
      "Role": sessionStorage.getItem("Role")
    }
  }

  getAllSectors(){
    this.setHeaders();
    return http.get("/sectors");
  }

  getSectorById(id){
    this.setHeaders();
    return http.get(`/sectors/${id}`);
  }

  getSectorCompanies(id){
    this.setHeaders();
    return http.get(`/sectors/${id}/companiesbysector`);
  }

  getSectorPrice(id){
    this.setHeaders();
    return http.get(`/sectors/${id}/sectorprice`);
  }

  getSectorPrice(id,from,to){
    this.setHeaders();
    return http.get(`/sectors/${id}/sectorprice?from=${from}&to=${to}`);
  }

  addSector(sector){
    this.setHeaders();
    return http.post("/sectors/add", sector);
  }
  updateSector(sector){
    this.setHeaders();
    return http.put("/sectors/update", sector);
  }
  deleteSector(id){
    this.setHeaders();
    return http.delete(`/sectors/delete/${id}`);
  }
}

export default new SectorServices();