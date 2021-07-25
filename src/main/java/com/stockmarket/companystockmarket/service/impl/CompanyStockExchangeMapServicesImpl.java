package com.stockmarket.companystockmarket.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.CompanyStockExchangeMapRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;

@Service
public class CompanyStockExchangeMapServicesImpl implements CompanyStockExchangeMapServices {

	@Autowired
	CompanyStockExchangeMapRepository companyStockExchangeMapRepository;
	
	@Autowired
	CompanyServices companyServices;
	
	@Autowired
	StockExchangeServices stockExchangeServices;
	
	@Override
	public CompanyStockExchangeMap addCompanyStockExchangeMap(CompanyStockExchangeMap companyStockExchangeMap) {
		Company company = companyServices.findByName(companyStockExchangeMap.getCompanyName());
		StockExchange stockExchange = stockExchangeServices.findByName(companyStockExchangeMap.getStockExchangeName());
		if(companyStockExchangeMapRepository.findById(companyStockExchangeMap.getId()).isPresent()
				|| companyStockExchangeMapRepository.findByCompanyAndStockExchange(company,stockExchange)!=null)
			return null;
		companyStockExchangeMap.setCompany(company);
		companyStockExchangeMap.setStockExchange(stockExchange);
		return companyStockExchangeMapRepository.save(companyStockExchangeMap);
	}

	@Override
	public CompanyStockExchangeMap updateCompanyStockExchangeMap(CompanyStockExchangeMap companyStockExchangeMap) {
		Company company = companyServices.findByName(companyStockExchangeMap.getCompanyName());
		StockExchange stockExchange = stockExchangeServices.findByName(companyStockExchangeMap.getStockExchangeName());
		if(!companyStockExchangeMapRepository.findById(companyStockExchangeMap.getId()).isPresent()
				|| companyStockExchangeMapRepository.findByCompanyAndStockExchange(company,stockExchange)==null)
			return null;
		companyStockExchangeMap.setCompany(company);
		companyStockExchangeMap.setStockExchange(stockExchange);
		return companyStockExchangeMapRepository.save(companyStockExchangeMap);
	}

	@Override
	public List<CompanyStockExchangeMap> getAllCompanyStockExchangeMaps() {
		return companyStockExchangeMapRepository.findAll();
	}

	@Override
	public CompanyStockExchangeMap findById(Long id) {
		return companyStockExchangeMapRepository.findById(id).get();
	}

	@Override
	public List<CompanyStockExchangeMap> findByCode(String code) {
		return companyStockExchangeMapRepository.findByCompanyCode(code);
	}

	@Override
	public Long deleteById(Long id) {
		if(!companyStockExchangeMapRepository.findById(id).isPresent())
			return null;
		companyStockExchangeMapRepository.deleteById(id);
		return id;
		
	}

	@Override
	public Company findByCompanyCodeAndStockExchange(String code, String stockExchangeName) {
		StockExchange stockExchange = stockExchangeServices.findByName(stockExchangeName);
		if(stockExchange==null) {
			return null;
		}
		return companyStockExchangeMapRepository.findCompanyByCompanyCodeAndStockExchange(code, stockExchange).getCompany();
	}

	@Override
	public List<CompanyStockExchangeMap> findByCompany(Company company) {
		return companyStockExchangeMapRepository.findByCompany(company);
	}

	@Override
	public List<CompanyStockExchangeMap> findByStockExchange(StockExchange stockExchange) {
		return companyStockExchangeMapRepository.findByStockExchange(stockExchange);
	}

}
