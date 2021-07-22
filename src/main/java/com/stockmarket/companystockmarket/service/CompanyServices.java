package com.stockmarket.companystockmarket.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.models.StockPrice;

public interface CompanyServices {
	public List<Company> getCompanies();
	public Optional<Company> findById(Long id);
	public List<Company> getMatchingCompanies(String pattern);
	public Company addCompany(Company company);
	public Company editCompany(Company company);
	public Company findByName(String name);
	public Long deleteCompany(Long id);
	public IPODetails getCompanyIpoDetails(Long id);
	List<StockPrice> getCompanyStockPrice(Long id, LocalDate from, LocalDate to);
	List<StockPrice> getCompanyStockPrice(Long id);
	public List<StockExchange> getStockExchanges(Long id);
}
