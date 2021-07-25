import http from "../http-common";

class CompanyStockMapServices{

  getCompanyStockMapById(id){
    return http.get(`/companystockmap/${id}`);
  }
  
  getStockExchangeCompanies(stockExchange){
    return http.post("/companystockmap/getCompanies",stockExchange);
  }

  addCompanyStockMap(companyStockMap){
    return http.post("/companystockmap/add",companyStockMap);
  }

  updateCompanyStockMap(companyStockMap){
    return http.put("/companystockmap/update", companyStockMap);
  }

  deleteCompanyStockMap(id){
    return http.delete(`/companystockmap/delete/${id}`);
  }


}

export default new CompanyStockMapServices();