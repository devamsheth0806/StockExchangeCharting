import http from "../http-common";

class SectorServices{
  getAllSectors(){
    return http.get("/sectors");
  }

  getSectorById(id){
    return http.get(`/sectors/${id}`);
  }

  getSectorCompanies(id){
    return http.get(`/sectors/${id}/companiesbysector`);
  }

  getSectorPrice(id){
    return http.get(`/sectors/${id}/sectorprice`);
  }

  getSectorPrice(id,from,to){
    return http.get(`/sectors/${id}/sectorprice?from=${from}&to=${to}`);
  }

  addSector(sector){
    return http.post("/sectors/add", sector);
  }
  updateSector(sector){
    return http.put("/sectors/update", sector);
  }
  deleteSector(id){
    return http.delete(`/sectors/delete/${id}`);
  }
}

export default new SectorServices();