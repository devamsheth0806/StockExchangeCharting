package com.stockmarket.companystockmarket.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.StockPriceRepository;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockPriceServices;

@Service
public class StockPriceServicesImpl implements StockPriceServices {

	@Autowired
	StockPriceRepository stockPriceRepository;
	
	@Autowired
	CompanyStockExchangeMapServices companyStockExchangeMapServices;
//	
//	@Autowired
//	CompanyServices companyServices;
//	
	@Override
	public StockPrice addStockPrice(StockPrice stockPrice) {
		if(stockPriceRepository.findById(stockPrice.getId()).isPresent())
			return null;
		Company company = companyStockExchangeMapServices
				.findByCompanyCodeAndStockExchange(stockPrice.getCompanyCode(), stockPrice.getExchangeName());
		stockPrice.setCompany(company);
		return stockPriceRepository.save(stockPrice);
	}

	@Override
	public StockPrice updateStockPrice(StockPrice stockPrice) {
		if(!stockPriceRepository.findById(stockPrice.getId()).isPresent())
			return null;
		Company company = companyStockExchangeMapServices
				.findByCompanyCodeAndStockExchange(stockPrice.getCompanyCode(), stockPrice.getExchangeName());
		stockPrice.setCompany(company);
		return stockPriceRepository.save(stockPrice);
	}

	@Override
	public List<StockPrice> getStockPrice() {
		return stockPriceRepository.findAll();
	}

	@Override
	public StockPrice findById(Long id) {
		return stockPriceRepository.getById(id);
	}

	@Override
	public Long deleteById(Long id) {
		Optional<StockPrice> stockPrice = stockPriceRepository.findById(id);
		if(!stockPrice.isPresent())
			return null;
		stockPriceRepository.delete(stockPrice.get());
		return id;
	}

}
