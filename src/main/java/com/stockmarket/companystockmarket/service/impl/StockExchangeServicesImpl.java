package com.stockmarket.companystockmarket.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.StockExchangeRepository;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;

@Service
public class StockExchangeServicesImpl implements StockExchangeServices {

	@Autowired
	StockExchangeRepository stockExchangeRepository;
	
	@Autowired
	CompanyStockExchangeMapServices companyStockExchangeMapServices;
	
	@Override
	public List<StockExchange> getStockExchangesList() {
		return stockExchangeRepository.findAll();
	}

	@Override
	public StockExchange findById(Long id) {
		return stockExchangeRepository.findById(id).get();
	}

	@Override
	public StockExchange addStockExchange(StockExchange stockExchange) {
		if(stockExchangeRepository.findById(stockExchange.getId()).isPresent()
				|| stockExchangeRepository.findByName(stockExchange.getName())!=null)
			return null;
		return stockExchangeRepository.save(stockExchange);
	}

	@Override
	public StockExchange updateStockExchange(StockExchange stockExchange) {
		if(!stockExchangeRepository.findById(stockExchange.getId()).isPresent())
			return null;
		StockExchange stockExchange2 = stockExchangeRepository.findByName(stockExchange.getName());
		if(stockExchange2!=null && !stockExchange.getId().equals(stockExchange2.getId()))
			return null;
		return stockExchangeRepository.save(stockExchange);
	}

	@Override
	public Long deleteStockExchange(Long id) {
		if(!stockExchangeRepository.findById(id).isPresent())
			return null;
		stockExchangeRepository.deleteById(id);
		return id;
	}

	@Override
	public StockExchange findByName(String name) {
		return stockExchangeRepository.findByName(name);
	}

}
