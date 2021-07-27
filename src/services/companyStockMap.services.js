import http from "../http-common";

class CompanyStockMapServices{

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": sessionStorage.getItem("Authorization"),
      "Username": sessionStorage.getItem("Username"),
      "Role": sessionStorage.getItem("Role")
    }
  }

  getCompanyStockMapById(id){
    this.setHeaders();
    return http.get(`/companystockmap/${id}`);
  }
  
  getStockExchangeCompanies(stockExchange){
    this.setHeaders();
    return http.post("/companystockmap/getCompanies",stockExchange);
  }

  addCompanyStockMap(companyStockMap){
    this.setHeaders();
    return http.post("/companystockmap/add",companyStockMap);
  }

  updateCompanyStockMap(companyStockMap){
    this.setHeaders();
    return http.put("/companystockmap/update", companyStockMap);
  }

  deleteCompanyStockMap(id){
    this.setHeaders();
    return http.delete(`/companystockmap/delete/${id}`);
  }


}

export default new CompanyStockMapServices();