import http from '../http-common';
class CompanyServices {
  getCompanies() {
    return http.get("/companies");
  }

  getCompanyByName(companyName) {
    return http.get(`/companies/getByName?companyName=${companyName}`);
  }

  getCompanyById(id){
    return http.get(`/companies/${id}`);
  }

  getCompanyStockPrices(id){
    return http.get(`/companies/${id}/stockprice`);
  }

  getCompanyStockPrices(id, from, to){
    return http.get(`/companies/${id}/stockprice?from=${from}&to=${to}`);
  }

  getCompanyStockExchanges(id) {
    return http.get(`/companies/${id}/stockexchanges`);
  }
  
  addCompany(company) {
    return http.post("/companies/add", company);
  }
  
  updateCompany(company) {
    return http.put("/companies/update", company);
  }

  deleteCompany(id){
    return http.delete(`/companies/delete/${id}`);
  }

}

export default new CompanyServices();