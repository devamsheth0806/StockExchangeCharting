package com.stockmarket.companystockmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.StockExchange;

@Repository
public interface CompanyStockExchangeMapRepository extends JpaRepository<CompanyStockExchangeMap,Long> {

	CompanyStockExchangeMap findByCompanyAndStockExchange(Company company, StockExchange stockExchange);
	List<CompanyStockExchangeMap> findByCompanyCode(String Code);
	List<CompanyStockExchangeMap> findByCompany(Company company);
	CompanyStockExchangeMap findCompanyByCompanyCodeAndStockExchange(String code, StockExchange stockExchange);
	
//	@Query("Select c from CompanyStockExchangeMap c where c.stockExchange=:stockExchange")
	List<CompanyStockExchangeMap> findByStockExchange(StockExchange stockExchange);
	
	
}