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
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.CompanyStockExchangeMapRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;
import com.stockmarket.companystockmarket.service.impl.CompanyServicesImpl;
import com.stockmarket.companystockmarket.service.impl.CompanyStockExchangeMapServicesImpl;

@SpringBootTest(classes = CompanyStockExchangeMapServices.class)
public class CompanyStockExchangeMapServicesTest {

	@InjectMocks
	CompanyStockExchangeMapServicesImpl companyStockExchangeMapServices;

	@Mock
	CompanyStockExchangeMapRepository companyStockExchangeMapRepository;

	@Mock
	CompanyServices companyServices;

	@Mock
	StockExchangeServices stockExchangeServices;

	@Test
	public void addCompanyStockExchangeMapTest() {
		Company company = new Company();
		StockExchange stockExchange = new StockExchange();
		StockExchange stockExchange2 = new StockExchange();
		CompanyStockExchangeMap companyExchangeMap = new CompanyStockExchangeMap();
		companyExchangeMap.setId(1L);
		companyExchangeMap.setCompany(company);
		companyExchangeMap.setStockExchange(stockExchange);

		CompanyStockExchangeMap companyExchangeMap2 = new CompanyStockExchangeMap();
		companyExchangeMap2.setId(2L);
		companyExchangeMap2.setCompany(company);
		companyExchangeMap2.setStockExchange(stockExchange2);

		when(companyStockExchangeMapRepository.findById(ArgumentMatchers.eq(1L)))
				.thenReturn(Optional.of(companyExchangeMap));

		when(companyStockExchangeMapRepository.findByCompanyAndStockExchange(ArgumentMatchers.eq(company),
				ArgumentMatchers.eq(stockExchange))).thenReturn(companyExchangeMap);

		when(companyStockExchangeMapRepository.save(ArgumentMatchers.eq(companyExchangeMap2)))
				.thenReturn(companyExchangeMap2);

		CompanyStockExchangeMap res = companyStockExchangeMapServices.addCompanyStockExchangeMap(companyExchangeMap2);
		CompanyStockExchangeMap res1 = companyStockExchangeMapServices.addCompanyStockExchangeMap(companyExchangeMap);
		assertEquals(companyExchangeMap2, res);
		assertEquals(null, res1);
	}

	@Test
	public void updateCompanyStockExchangeMapest() {
		Company company = new Company();
		StockExchange stockExchange = new StockExchange();

		CompanyStockExchangeMap companyExchangeMap = new CompanyStockExchangeMap();
		companyExchangeMap.setId(1L);
		companyExchangeMap.setCompanyName("c1");
		companyExchangeMap.setStockExchangeName("s1");

		CompanyStockExchangeMap companyExchangeMap2 = new CompanyStockExchangeMap();
		companyExchangeMap2.setId(2L);
		companyExchangeMap2.setCompanyName("c2");
		companyExchangeMap2.setStockExchangeName("s2");

		when(companyServices.findByName(ArgumentMatchers.eq("c1"))).thenReturn(company);
		when(stockExchangeServices.findByName(ArgumentMatchers.eq("s1"))).thenReturn(stockExchange);

		when(companyStockExchangeMapRepository.findById(ArgumentMatchers.eq(1L)))
				.thenReturn(Optional.of(companyExchangeMap));

		when(companyStockExchangeMapRepository.findByCompanyAndStockExchange(ArgumentMatchers.eq(company),
				ArgumentMatchers.eq(stockExchange))).thenReturn(companyExchangeMap);

		when(companyStockExchangeMapRepository.save(ArgumentMatchers.eq(companyExchangeMap)))
				.thenReturn(companyExchangeMap);

		CompanyStockExchangeMap res = companyStockExchangeMapServices.updateCompanyStockExchangeMap(companyExchangeMap);
		CompanyStockExchangeMap res1 = companyStockExchangeMapServices.addCompanyStockExchangeMap(companyExchangeMap2);
		assertEquals(companyExchangeMap, res);
		assertEquals(null, res1);
	}

	@Test
	public void getAllCompanyStockExchangeMapsTest() {
		List<CompanyStockExchangeMap> maps = new ArrayList<>();

		when(companyStockExchangeMapRepository.findAll()).thenReturn(maps);

		List<CompanyStockExchangeMap> res = companyStockExchangeMapServices.getAllCompanyStockExchangeMaps();

		assertEquals(maps, res);
	}

	@Test
	public void findByIdTest() {
		CompanyStockExchangeMap map = new CompanyStockExchangeMap();
		when(companyStockExchangeMapRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(map));

		CompanyStockExchangeMap res = companyStockExchangeMapServices.findById(1L);

		assertEquals(map, res);
	}

	@Test
	public void findByCode() {
		List<CompanyStockExchangeMap> maps = new ArrayList<>();
		when(companyStockExchangeMapRepository.findByCompanyCode(ArgumentMatchers.eq("50012"))).thenReturn(maps);

		List<CompanyStockExchangeMap> res = companyStockExchangeMapServices.findByCode("50012");

		assertEquals(maps, res);
	}

	@Test
	public void deleteById() {
		CompanyStockExchangeMap map = new CompanyStockExchangeMap();
		when(companyStockExchangeMapRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(map));

		Long res = companyStockExchangeMapServices.deleteById(1L);
		Long res2 = companyStockExchangeMapServices.deleteById(2L);
		assertEquals(1L, res);
		assertEquals(null, res2);
	}

	@Test
	public void findByCompanyCodeAndStockExchange() {
		Company company = new Company();
		StockExchange stockExchange = new StockExchange();

		CompanyStockExchangeMap companyExchangeMap = new CompanyStockExchangeMap();
		companyExchangeMap.setId(1L);
		companyExchangeMap.setCompany(company);
		companyExchangeMap.setStockExchange(stockExchange);

		when(stockExchangeServices.findByName("s1")).thenReturn(stockExchange);
		when(companyStockExchangeMapRepository.findCompanyByCompanyCodeAndStockExchange(ArgumentMatchers.eq("c1"),
				ArgumentMatchers.eq(stockExchange))).thenReturn(companyExchangeMap);
		
		Company res = companyStockExchangeMapServices.findByCompanyCodeAndStockExchange("c1","s1");
		Company res1 = companyStockExchangeMapServices.findByCompanyCodeAndStockExchange("c1","s2");
		
		assertEquals(company, res);
		assertEquals(null, res1);
	}

	@Test
	public void findByCompanyTest() {
		Company company = new Company();
		List<CompanyStockExchangeMap> maps = new ArrayList<>();
		when(companyStockExchangeMapRepository.findByCompany(ArgumentMatchers.eq(company))).thenReturn(maps);
		
		List<CompanyStockExchangeMap> res = companyStockExchangeMapServices.findByCompany(company);
		assertEquals(maps, res);
	}

	@Test
	public void findByStockExchange() {
		StockExchange stockExchange = new StockExchange();
		List<CompanyStockExchangeMap> maps = new ArrayList<>();
		when(companyStockExchangeMapRepository.findByStockExchange(ArgumentMatchers.eq(stockExchange))).thenReturn(maps);
		
		List<CompanyStockExchangeMap> res = companyStockExchangeMapServices.findByStockExchange(stockExchange);
		assertEquals(maps, res);
	}

}
