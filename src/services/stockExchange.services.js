import http from "../http-common";

class StockExchangeSerivces{

  getAllStockExchanges(){
    return http.get("/stockExchanges");
  }
  
  addStockExchange(stockExchange){
    return http.post("/stockExchanges/add", stockExchange);
  }
  updateStockExchange(stockExchange){
    return http.put("/stockExchange/update", stockExchange);
  }
  deleteStockExchange(id){
    return http.delete(`/stockExchange/delete/${id}`);
  }
}

export default new StockExchangeSerivces();