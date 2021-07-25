package com.stockmarket.companystockmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.service.StockPriceServices;

@Repository
public interface CompanyRepository  extends JpaRepository<Company,Long> {
   Company findCompanyByCompanyName(String Name);
   List<Company> findCompanyByCompanyNameContainingIgnoreCase(String pattern);
   
   @Query("Select c.stockPrices from Company c where c.id=:id")
   List<StockPrice> findCompanyStockPrices(Long id);
   
}