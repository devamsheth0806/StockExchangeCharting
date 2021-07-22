import http from '../http-common';
class CompanyServices{
  getCompanies(){
    return http.get("/companies");
  }

  addCompany(company){
    return http.post("/companies/add",company);
  }
}

export default new CompanyServices();