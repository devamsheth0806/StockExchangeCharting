package com.stockmarket.companystockmarket.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.IPODetailsRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.IPODetailsServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;

@Service
public class IPODetailsServicesImpl implements IPODetailsServices {

	@Autowired
	IPODetailsRepository ipoDetailsRepository;
	
	@Autowired
	CompanyServices companyServices;
	
	@Autowired
	StockExchangeServices stockExchangeServices;
	
	@Override
	public IPODetails addIPODetails(IPODetails ipoDetails) {
		Company company = companyServices.findByName(ipoDetails.getCompanyName());
		if(ipoDetailsRepository.findById(ipoDetails.getId()).isPresent()|| ipoDetailsRepository.findByCompany(company)!=null)
			return null;
		ipoDetails.setStockExchanges(new ArrayList<>());
		for(String stockExchangeName: ipoDetails.getStockExchangeNames()) {
			StockExchange stockExchange = stockExchangeServices.findByName(stockExchangeName);
			ipoDetails.getStockExchanges().add(stockExchange);
		}
		ipoDetails.setCompany(company);
		return ipoDetailsRepository.save(ipoDetails);
	}

	@Override
	public IPODetails updateIPODetails(IPODetails ipoDetails) {
		Company company = companyServices.findByName(ipoDetails.getCompanyName());
		if(!ipoDetailsRepository.findById(ipoDetails.getId()).isPresent()|| ipoDetailsRepository.findByCompany(company)==null)
			return null;
		ipoDetails.setStockExchanges(new ArrayList<>());
		for(String stockExchangeName: ipoDetails.getStockExchangeNames()) {
			StockExchange stockExchange = stockExchangeServices.findByName(stockExchangeName);
			ipoDetails.getStockExchanges().add(stockExchange);
		}
		ipoDetails.setCompany(company);
		return ipoDetailsRepository.save(ipoDetails);
	}

	@Override
	public List<IPODetails> getIPODetails() {
		return ipoDetailsRepository.findAll();
	}

	@Override
	public IPODetails findById(Long id) {
		return ipoDetailsRepository.getById(id);
	}

	@Override
	public Long deleteById(Long id) {
		if(!ipoDetailsRepository.findById(id).isPresent())
			return null;
		ipoDetailsRepository.deleteById(id);
		return id;
	}

}
