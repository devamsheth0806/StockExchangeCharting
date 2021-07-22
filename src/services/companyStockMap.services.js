import http from "../http-common";

class CompanyStockMapServices{

  addCompanyStockMap(companyStockMap){
    return http.post("/companystockmap/add",companyStockMap);
  }

}

export default new CompanyStockMapServices();