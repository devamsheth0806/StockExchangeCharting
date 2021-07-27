import http from "../http-common";

class StockExchangeSerivces{

  setHeaders() {
    http.defaults.headers = {
      "Content-type": "application/json",
      "Authorization": sessionStorage.getItem("Authorization"),
      "Username": sessionStorage.getItem("Username"),
      "Role": sessionStorage.getItem("Role")
    }
  }
  getAllStockExchanges(){
    this.setHeaders();
    return http.get("/stockExchanges");
  }
  
  getStockExchangeById(id){
    this.setHeaders();
    return http.get(`/stockExchanges/${id}`);
  }

  addStockExchange(stockExchange){
    this.setHeaders();
    return http.post("/stockExchanges/add", stockExchange);
  }
  updateStockExchange(stockExchange){
    this.setHeaders();
    return http.put("/stockExchanges/update", stockExchange);
  }
  deleteStockExchange(id){
    this.setHeaders();
    return http.delete(`/stockExchanges/delete/${id}`);
  }
}

export default new StockExchangeSerivces();