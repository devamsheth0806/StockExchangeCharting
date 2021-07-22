package com.stockmarket.companystockmarket.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.CompanyRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.IPODetailsServices;
import com.stockmarket.companystockmarket.service.SectorServices;

@Service
public class CompanyServicesImpl implements CompanyServices {

	@Autowired
	CompanyRepository compRepo;
	
	@Autowired
	SectorServices sectorServices;
	
	@Autowired
	IPODetailsServices ipoDetailsServices;
	
	@Autowired
	CompanyStockExchangeMapServices companyStockExchangeMapServices;
	
	@Override
	public List<Company> getCompanies() {
		return compRepo.findAll();
	}

	@Override
	public Optional<Company> findById(Long id) {
		return compRepo.findById(id);
	}

	@Override
	public List<Company> getMatchingCompanies(String pattern) {
		return compRepo.findCompanyByCompanyNameIgnoreCaseContaining(pattern);
	}

	@Override
	public Company addCompany(Company company) {
		if(compRepo.findById(company.getId()).isPresent()|| compRepo.findCompanyByCompanyName(company.getCompanyName())!=null)
			return null;
		company.setSector(sectorServices.findByName(company.getSectorName()));
		return compRepo.save(company);
	}

	      
	@Override
	public Company editCompany(Company company) {
		if(!compRepo.findById(company.getId()).isPresent()|| compRepo.findCompanyByCompanyName(company.getCompanyName())==null)
			return null;
		return compRepo.save(company);
	}

	@Override
	public Long deleteCompany(Long id) {
		Optional<Company> company = compRepo.findById(id); 
		if(!company.isPresent())
			return null;
		compRepo.delete(company.get());
		return id;
	}

	@Override
	public IPODetails getCompanyIpoDetails(Long id) {
		Optional<Company> company = compRepo.findById(id); 
		if(!company.isPresent())
			return null;
		IPODetails ipo = company.get().getIpo();
		return ipo;
	}

	@Override
	public Company findByName(String name) {
		return compRepo.findCompanyByCompanyName(name);
	}

	@Override
	public List<StockExchange> getStockExchanges(Long id) {
		Company company = compRepo.findById(id).get();
		if (company==null) {
			return null;
		}
		List<StockExchange> stockExchanges = new ArrayList<StockExchange>();
		companyStockExchangeMapServices.findByCompany(company)
		.forEach(companyStockMap ->{
			stockExchanges.add(companyStockMap.getStockExchange());
		});
		return stockExchanges;
	}
	
	public List<StockPrice> getCompanyStockPrice(Long id, LocalDate from, LocalDate to){//, String periodicity){
		Company company = compRepo.findById(id).get();
		if (company==null) {
			return null;
		}
		List<StockPrice> stockPrices = new ArrayList<>();
		company.getStockPrices().forEach( s -> {
			if(!(s.getDatee().isAfter(to) || s.getDatee().isBefore(from))) {
				stockPrices.add(s);
			}
		});
		return stockPrices;
	}
	
	public List<StockPrice> getCompanyStockPrice(Long id){
		Company company = compRepo.findById(id).get();
		if (company==null) {
			return null;
		}
		return company.getStockPrices();
	}

}
