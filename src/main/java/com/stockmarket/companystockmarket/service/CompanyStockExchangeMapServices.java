package com.stockmarket.companystockmarket.service;

import java.util.List;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.StockExchange;

public interface CompanyStockExchangeMapServices {

	public CompanyStockExchangeMap addCompanyStockExchangeMap(CompanyStockExchangeMap companyStockExchangeMap);
	public CompanyStockExchangeMap updateCompanyStockExchangeMap(CompanyStockExchangeMap companyStockExchangeMap);
	public List<CompanyStockExchangeMap> getAllCompanyStockExchangeMaps();
	public CompanyStockExchangeMap findById(Long id);
	public List<CompanyStockExchangeMap> findByCode(String code);
	public List<CompanyStockExchangeMap> findByCompany(Company company);
	public List<Company> findByStockExchange(StockExchange stockExchange);
	public Company findByCompanyCodeAndStockExchange(String code, String stockExchangeName);
	public Long deleteById(Long id);
}
