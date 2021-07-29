package com.stockmarket.companystock.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.hibernate.type.LocalDateType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.CompanyRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;
import com.stockmarket.companystockmarket.service.SectorServices;
import com.stockmarket.companystockmarket.service.impl.CompanyServicesImpl;

@SpringBootTest(classes=CompanyServices.class)
public class CompanyServiceTest {

	@InjectMocks
	CompanyServicesImpl companyServicesImpl;

	@Mock
	SectorServices sectorServices;

	@Mock
	IPODetails ipoDetails;

	@Mock
	CompanyRepository companyRepository;

	@Mock
	CompanyStockExchangeMapServices companyStockExchangeMapServices;

	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	public void getCompaniesTest() {
		List<Company> companies = new ArrayList<>();

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company);

		when(companyRepository.findAll()).thenReturn(companies);

		companies = companyServicesImpl.getCompanies();
		assertEquals(1, companies.size());

	}

	@Test
	public void findByIdTest() {
		List<Company> companies = new ArrayList<>();

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company);

		when(companyRepository.findById(ArgumentMatchers.anyLong())).thenReturn(Optional.of(company));

		Optional<Company> compOp = companyServicesImpl.findById(1L);
		assertEquals(company, compOp.get());
	}

	@Test
	public void getMatchingCompaniesTest() {

		List<Company> companies = new ArrayList<>();

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company);

		Company company1 = new Company();
		company.setId(1L);
		company.setCompanyName("sample2");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company1);

		Company company2 = new Company();
		company.setId(1L);
		company.setCompanyName("ABc");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company2);

		when(companyRepository.findCompanyByCompanyNameContainingIgnoreCase(ArgumentMatchers.anyString()))
				.thenReturn(Arrays.asList(company1, company2));

		companies = companyServicesImpl.getMatchingCompanies("Sam");
		assertEquals(2, companies.size());
	}

	@Test
	public void addCompanyTest() {
		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");

		when(companyRepository.save(ArgumentMatchers.any())).thenReturn(company);

		Company res = companyServicesImpl.addCompany(company);
		assertEquals(company, res);
	}

	@Test
	public void updateCompanyTest() {
		List<Company> companies = new ArrayList<>();

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		companies.add(company);

		when(companyRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(company));
		when(companyRepository.findCompanyByCompanyName(ArgumentMatchers.eq(company.getCompanyName())))
				.thenReturn(company);
		when(companyRepository.save(ArgumentMatchers.any())).thenReturn(company);

		Company res1 = companyServicesImpl.updateCompany(company);
		company.setId(2L);
		Company res2 = companyServicesImpl.updateCompany(company);
		assertEquals(company, res1);
		assertEquals(null, res2);
	}

	@Test
	public void deleteCompanyTest() {
		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");

		when(companyRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(company));
		doNothing().when(companyRepository).delete(company);

		Long res = companyServicesImpl.deleteCompany(1L);
		Long res2 = companyServicesImpl.deleteCompany(2L);
		assertEquals(1L, res);
		assertEquals(null, res2);

	}

	@Test
	public void getCompanyIpoDetailsTest() {

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		company.setIpo(ipoDetails);
		when(companyRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(company));

		IPODetails ipo = companyServicesImpl.getCompanyIpoDetails(1L);
		IPODetails ipo2 = companyServicesImpl.getCompanyIpoDetails(2L);

		assertEquals(ipo, ipo);
		assertEquals(null, ipo2);
	}

	@Test
	public void findByNameTest() {

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		company.setIpo(ipoDetails);

		when(companyRepository.findCompanyByCompanyName(ArgumentMatchers.eq("sample1"))).thenReturn(company);

		Company res = companyServicesImpl.findByName("sample1");
		Company res2 = companyServicesImpl.findByName("sample2");
		assertEquals(company, res);
		assertEquals(null, res2);
	}

	@Test
	public void getStockExchangesTest() {

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");

		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("BSE");

		CompanyStockExchangeMap companyStockMap = new CompanyStockExchangeMap(0, "50012", null, null, company,
				stockExchange);

		when(companyRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(company));

		List<CompanyStockExchangeMap> companyStockMaps = Arrays.asList(companyStockMap);

		when(companyStockExchangeMapServices.findByCompany(ArgumentMatchers.eq(company))).thenReturn(companyStockMaps);

		List<StockExchange> res = companyServicesImpl.getStockExchanges(1L);
		List<StockExchange> res2 = companyServicesImpl.getStockExchanges(2L);
		assertEquals(1, res.size());
		assertEquals(null, res2);

	}

	@Test
	public void getCompanyStockPriceDateTimetest() {

		StockPrice stockPrice = new StockPrice();
		stockPrice.setDatee(LocalDate.of(2019, 6, 8));
		stockPrice.setTimee(LocalTime.of(10, 15, 50));

		StockPrice stockPrice2 = new StockPrice();
		stockPrice2.setDatee(LocalDate.of(2019, 6, 18));
		stockPrice2.setTimee(LocalTime.of(10, 15, 50));

		List<StockPrice> stockPrices = Arrays.asList(stockPrice, stockPrice2);

		Company company = new Company();
		company.setId(1L);
		company.setCompanyName("sample1");
		company.setTurnover(234.44);
		company.setCeo("sds aws");
		company.setSectorName("Finance");
		company.setBoardOfDirectors("asda, asd, as");
		company.setCompanyBrief("very well known");
		company.setStockPrices(stockPrices);

		when(companyRepository.findCompanyStockPrices(ArgumentMatchers.eq(1L))).thenReturn(stockPrices);

		List<StockPrice> res = companyServicesImpl.getCompanyStockPrice(1L, LocalDate.of(2019, 6, 8),
				LocalDate.of(2019, 6, 8));
		List<StockPrice> res1 = companyServicesImpl.getCompanyStockPrice(1L, LocalDate.of(2019, 6, 8),
				LocalDate.of(2019, 6, 18));
		List<StockPrice> res2 = companyServicesImpl.getCompanyStockPrice(2L, LocalDate.of(2019, 6, 8),
				LocalDate.of(2019, 6, 18));
		List<StockPrice> res3 = companyServicesImpl.getCompanyStockPrice(1L);
		assertEquals(1, res.size());
		assertEquals(2, res1.size());
		assertEquals(0, res2.size());
		assertEquals(2, res3.size());

	}

}
