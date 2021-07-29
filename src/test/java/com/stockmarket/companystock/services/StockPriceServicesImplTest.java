package com.stockmarket.companystock.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.StockPriceRepository;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockPriceServices;
import com.stockmarket.companystockmarket.service.impl.StockPriceServicesImpl;

@SpringBootTest(classes=StockPriceServices.class)
public class StockPriceServicesImplTest {

	@InjectMocks
	StockPriceServicesImpl stockPriceServicesImpl;
	
	@Mock
	StockPriceRepository stockPriceRepository;
	
	@Mock
	CompanyStockExchangeMapServices companyStockExchangeMapServices;

	@Test
	public void addStockPriceTest() {
		
		StockPrice s = new StockPrice();
		s.setId(1L);
		s.setCompanyCode("c1");
		s.setExchangeName("s1");
		
		StockPrice s2 = new StockPrice();
		s2.setId(2L);
		Company c = new Company();
		when(stockPriceRepository.findById(2L)).thenReturn(Optional.of(s2));
		
		when(companyStockExchangeMapServices.findByCompanyCodeAndStockExchange("c1", "s1")).thenReturn(c);
		when(stockPriceRepository.save(s)).thenReturn(s);
		
		StockPrice res = stockPriceServicesImpl.addStockPrice(s);
		StockPrice res2 = stockPriceServicesImpl.addStockPrice(s2);
		assertEquals(s, res);
		assertEquals(null, res2);
	}

	@Test
	public void updateStockPriceTest() {
		StockPrice s = new StockPrice();
		s.setId(1L);
		s.setCompanyCode("c1");
		s.setExchangeName("s1");
		
		StockPrice s2 = new StockPrice();
		s2.setId(2L);
		Company c = new Company();
		when(stockPriceRepository.findById(1L)).thenReturn(Optional.of(s));
		when(companyStockExchangeMapServices.findByCompanyCodeAndStockExchange("c1", "s1")).thenReturn(c);
		when(stockPriceRepository.save(s)).thenReturn(s);
		
		StockPrice res = stockPriceServicesImpl.updateStockPrice(s);
		StockPrice res2 = stockPriceServicesImpl.updateStockPrice(s2);
		assertEquals(s, res);
		assertEquals(null, res2);
	}

	@Test
	public void getStockPriceTest() {
		List<StockPrice> sps = new ArrayList<>();
		when(stockPriceRepository.findAll()).thenReturn(sps);
		
		List<StockPrice> res = stockPriceServicesImpl.getStockPrice();
		
		assertEquals(sps, res);
		
	}

	@Test
	public void findById() {
		StockPrice s = new StockPrice();
		
		when(stockPriceRepository.getById(1L)).thenReturn(s);
		
		assertEquals(s, s);
		
	}

	@Test
	public void deleteByIdTest() {
		StockPrice s = new StockPrice();
		s.setId(1L);
		StockPrice s2 = new StockPrice();
		s2.setId(2L);
		
		when(stockPriceRepository.findById(1L)).thenReturn(Optional.of(s));
		
		Long res = stockPriceServicesImpl.deleteById(1L);
		Long res2 = stockPriceServicesImpl.deleteById(2L);
		
		assertEquals(1L, res);
		assertEquals(null, res2);
		
	}

}
