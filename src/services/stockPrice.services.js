import http from "../http-common";

class StockPriceServices{
  
  getStockPrices(){
    return http.get("/stockprices");
  }
  
  addStockPrices(stockPrices){
    return http.post("/stockprices/add",stockPrices)
  }

  deleteStockPrice(id){
    return http.delete(`/stockprices/delete/${id}`);
  }

}

export default new StockPriceServices();