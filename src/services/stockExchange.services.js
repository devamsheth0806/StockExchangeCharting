import http from "../http-common";

class StockExchangeSerivces{

  getAllStockExchanges(){
    return http.get("/stockExchanges");
  }
  
  getStockExchangeById(id){
    return http.get(`/stockExchanges/${id}`);
  }

  addStockExchange(stockExchange){
    return http.post("/stockExchanges/add", stockExchange);
  }
  updateStockExchange(stockExchange){
    return http.put("/stockExchanges/update", stockExchange);
  }
  deleteStockExchange(id){
    return http.delete(`/stockExchanges/delete/${id}`);
  }
}

export default new StockExchangeSerivces();