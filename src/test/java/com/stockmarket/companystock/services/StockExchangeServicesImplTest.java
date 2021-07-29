package com.stockmarket.companystock.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.StockExchangeRepository;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;
import com.stockmarket.companystockmarket.service.impl.StockExchangeServicesImpl;

@SpringBootTest(classes = StockExchangeServices.class)
public class StockExchangeServicesImplTest {

	@InjectMocks
	StockExchangeServicesImpl stockExchangeServicesImpl;

	@Mock
	StockExchangeRepository stockExchangeRepository;

	@Mock
	CompanyStockExchangeMapServices companyStockExchangeMapServices;

	@Test
	public void getStockExchangesListTest() {
		List<StockExchange> ss = new ArrayList<>();

		when(stockExchangeRepository.findAll()).thenReturn(ss);

		List<StockExchange> res = stockExchangeServicesImpl.getStockExchangesList();

		assertEquals(ss, res);
	}

	@Test
	public void findByIdTest() {

		StockExchange ss = new StockExchange();

		when(stockExchangeRepository.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(ss));

		StockExchange res = stockExchangeServicesImpl.findById(1L);

		assertEquals(ss, res);
	}

	@Test
	public void addStockExchangeTest() {
		
		StockExchange s = new StockExchange();
		s.setId(1L);
		
		StockExchange s2 = new StockExchange();
		s2.setId(2L);
		
		StockExchange s3 = new StockExchange();
		s3.setId(3L);
		s3.setName("s3");
		
		when(stockExchangeRepository.findById(ArgumentMatchers.eq(2L))).thenReturn(Optional.of(s2));
		when(stockExchangeRepository.findByName("s3")).thenReturn(s3);
		when(stockExchangeRepository.save(s)).thenReturn(s);

		StockExchange res = stockExchangeServicesImpl.addStockExchange(s);
		StockExchange res1 = stockExchangeServicesImpl.addStockExchange(s2);
		StockExchange res2 = stockExchangeServicesImpl.addStockExchange(s3);
		
		assertEquals(s, res);
		assertEquals(null, res1);
		assertEquals(null, res2);
	}

	@Test
	public void updateStockExchangeTest() {
		
		StockExchange s = new StockExchange();
		s.setId(1L);
		
		StockExchange s2 = new StockExchange();
		s2.setId(2L);
		
		StockExchange s3 = new StockExchange();
		s3.setId(3L);
		s3.setName("s3");
		
		when(stockExchangeRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(s));
		when(stockExchangeRepository.findByName("s3")).thenReturn(s);
		when(stockExchangeRepository.save(s)).thenReturn(s);

		StockExchange res = stockExchangeServicesImpl.updateStockExchange(s);
		StockExchange res1 = stockExchangeServicesImpl.updateStockExchange(s2);
		StockExchange res2 = stockExchangeServicesImpl.updateStockExchange(s3);
		
		assertEquals(s, res);
		assertEquals(null, res1);
		assertEquals(null, res2);
	}

	@Test
	public void deleteStockExchangetest() {
		StockExchange s = new StockExchange();
		s.setId(1L);
		StockExchange s2 = new StockExchange();
		s2.setId(2L);
		
		when(stockExchangeRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(s));
		
		Long res = stockExchangeServicesImpl.deleteStockExchange(1L);
		Long res2 = stockExchangeServicesImpl.deleteStockExchange(2L);
		
		assertEquals(1L, res);
		assertEquals(null, res2);
	}

	@Test
	public void findByNameTest() {
		StockExchange s = new StockExchange();
		
		when(stockExchangeRepository.findByName("s")).thenReturn(s);
		
		StockExchange res = stockExchangeServicesImpl.findByName("s");
		
		assertEquals(s, res);
	}

}
