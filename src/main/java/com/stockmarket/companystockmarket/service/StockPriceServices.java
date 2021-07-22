package com.stockmarket.companystockmarket.service;

import java.util.List;

import com.stockmarket.companystockmarket.models.StockPrice;

public interface StockPriceServices {
	public StockPrice addStockPrice(StockPrice stockPrice);
	public StockPrice updateStockPrice(StockPrice stockPrice);
	public List<StockPrice> getStockPrice();
	public StockPrice findById(Long id);
	public Long deleteById(Long id);
}
