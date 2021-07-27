import http from "../http-common";

class StockPriceServices{
  
  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": sessionStorage.getItem("Authorization"),
      "Username": sessionStorage.getItem("Username"),
      "Role": sessionStorage.getItem("Role")
    }
  }

  getStockPrices(){
    this.setHeaders();
    return http.get("/stockprices");
  }
  
  addStockPrices(stockPrices){
    this.setHeaders();
    return http.post("/stockprices/add",stockPrices)
  }

  deleteStockPrice(id){
    this.setHeaders();
    return http.delete(`/stockprices/delete/${id}`);
  }

}

export default new StockPriceServices();