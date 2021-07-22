package com.stockmarket.companystockmarket.service;

import java.util.List;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockExchange;

public interface StockExchangeServices {
	public List<StockExchange> getStockExchangesList();
	public StockExchange findById(Long id);
	public StockExchange findByName(String name);
	public StockExchange addStockExchange(StockExchange stockExchange);
	public StockExchange updateStockExchange(StockExchange stockExchange);
	public Long deleteStockExchange(Long id);
	public List<Company> getCompanies(Long id);
//	public StockExchange addCompanyToStockExchange(String stockExchangeName, CompanyDto companyDto);
}
