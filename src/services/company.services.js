import reactSessionApi from 'react-session-api';
import http from '../http-common';
class CompanyServices {

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": reactSessionApi.get("Authorization"),
      "Username": reactSessionApi.get("Username"),
      "Role": reactSessionApi.get("Role")
    }
  }

  getCompanies() {
    this.setHeaders();
    return http.get("/companies");
  }

  getCompanyByName(companyName) {
    this.setHeaders();
    return http.get(`/companies/getByName?companyName=${companyName}`);
  }

  getCompanyById(id) {
    this.setHeaders();
    return http.get(`/companies/${id}`);
  }

  getCompanyStockPrices(id) {
    this.setHeaders();
    return http.get(`/companies/${id}/stockprice`);
  }

  getCompanyStockPrices(id, from, to) {
    this.setHeaders();
    return http.get(`/companies/${id}/stockprice?from=${from}&to=${to}`);
  }

  getCompanyStockExchanges(id) {
    this.setHeaders();
    return http.get(`/companies/${id}/stockexchanges`);
  }

  addCompany(company) {
    this.setHeaders();
    return http.post("/companies/add", company);
  }

  updateCompany(company) {
    this.setHeaders();
    return http.put("/companies/update", company);
  }

  deleteCompany(id) {
    this.setHeaders();
    return http.delete(`/companies/delete/${id}`);
  }

}

export default new CompanyServices();