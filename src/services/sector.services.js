import http from "../http-common";

class SectorServices{
  getAllSectors(){
    return http.get("/sectors");
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