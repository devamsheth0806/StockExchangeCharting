package com.stockmarket.companystock.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.repository.IPODetailsRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.IPODetailsServices;
import com.stockmarket.companystockmarket.service.StockExchangeServices;
import com.stockmarket.companystockmarket.service.impl.IPODetailsServicesImpl;

@SpringBootTest(classes = IPODetailsServices.class)
public class IPODetailsServicesImplTest {

	@InjectMocks
	IPODetailsServicesImpl ipoDetailsServicesImpl;

	@Mock
	IPODetailsRepository ipoDetailsRepository;

	@Mock
	CompanyServices companyServices;

	@Mock
	StockExchangeServices stockExchangeServices;

	@Test
	public void addIPODetails() {

		Company company = new Company();
		company.setId(1L);
		Company company2 = new Company();
		company2.setId(2L);
		Company company3 = new Company();
		company3.setId(3L);
		List<String> exnames = new ArrayList<>();
		exnames.add("s1");
		exnames.add("s2");
		IPODetails ipoDetails = new IPODetails();
		ipoDetails.setId(1L);
		ipoDetails.setCompanyName("c1");		
		ipoDetails.setStockExchangeNames(exnames);

		IPODetails ipoDetails2 = new IPODetails();
		ipoDetails2.setId(2L);
		ipoDetails2.setCompanyName("c2");

		IPODetails ipoDetails3 = new IPODetails();
		ipoDetails3.setId(3L);
		ipoDetails3.setCompanyName("c3");

		StockExchange stockExchange = new StockExchange();

		when(companyServices.findByName(ArgumentMatchers.eq("c1"))).thenReturn(company);
		when(companyServices.findByName(ArgumentMatchers.eq("c2"))).thenReturn(company2);
		when(companyServices.findByName(ArgumentMatchers.eq("c3"))).thenReturn(company3);

		when(ipoDetailsRepository.findById(ArgumentMatchers.eq(2L))).thenReturn(Optional.of(ipoDetails2));
		when(ipoDetailsRepository.findByCompany(ArgumentMatchers.eq(company3))).thenReturn(ipoDetails3);
		when(stockExchangeServices.findByName(ArgumentMatchers.anyString())).thenReturn(stockExchange);
		when(ipoDetailsRepository.save(ArgumentMatchers.eq(ipoDetails))).thenReturn(ipoDetails);

		IPODetails res = ipoDetailsServicesImpl.addIPODetails(ipoDetails);
		IPODetails res1 = ipoDetailsServicesImpl.addIPODetails(ipoDetails2);
		IPODetails res2 = ipoDetailsServicesImpl.addIPODetails(ipoDetails3);

		assertEquals(ipoDetails, res);
		assertEquals(null, res1);
		assertEquals(null, res2);
	}

	@Test
	public void updateIPODetailsTest() {

		Company company = new Company();
		company.setId(1L);
		Company company2 = new Company();
		company2.setId(2L);
		Company company3 = new Company();
		company3.setId(3L);
		
		List<String> exnames = new ArrayList<>();
		exnames.add("s1");
		exnames.add("s2");
		
		IPODetails ipoDetails = new IPODetails();
		ipoDetails.setId(1L);
		ipoDetails.setCompanyName("c1");
		ipoDetails.setStockExchangeNames(exnames);
		
		IPODetails ipoDetails2 = new IPODetails();
		ipoDetails2.setId(2L);
		ipoDetails2.setCompanyName("c2");

		IPODetails ipoDetails3 = new IPODetails();
		ipoDetails3.setId(3L);
		ipoDetails3.setCompanyName("c3");

		StockExchange stockExchange = new StockExchange();

		when(companyServices.findByName(ArgumentMatchers.eq("c1"))).thenReturn(company);
		when(companyServices.findByName(ArgumentMatchers.eq("c2"))).thenReturn(company2);
		when(companyServices.findByName(ArgumentMatchers.eq("c3"))).thenReturn(company3);

		when(ipoDetailsRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(ipoDetails));
		when(ipoDetailsRepository.findById(ArgumentMatchers.eq(3L))).thenReturn(Optional.of(ipoDetails3));
		when(ipoDetailsRepository.findByCompany(ArgumentMatchers.eq(company3))).thenReturn(ipoDetails);
		when(ipoDetailsRepository.findByCompany(ArgumentMatchers.eq(company))).thenReturn(null);
		when(stockExchangeServices.findByName(ArgumentMatchers.anyString())).thenReturn(stockExchange);
		when(ipoDetailsRepository.save(ArgumentMatchers.eq(ipoDetails))).thenReturn(ipoDetails);

		IPODetails res = ipoDetailsServicesImpl.updateIPODetails(ipoDetails);
		IPODetails res1 = ipoDetailsServicesImpl.updateIPODetails(ipoDetails2);
		IPODetails res2 = ipoDetailsServicesImpl.updateIPODetails(ipoDetails3);

		assertEquals(ipoDetails, res);
		assertEquals(null, res1);
		assertEquals(null, res2);
	}

	@Test
	public void getIPODetailsTest() {
		List<IPODetails> ipos = new ArrayList<>();
		when(ipoDetailsRepository.findAll()).thenReturn(ipos);
		
		List<IPODetails> res = ipoDetailsServicesImpl.getIPODetails();
		assertEquals(ipos, res);
	}

	@Test
	public void findByIdTest() {
		IPODetails ipo = new IPODetails();
		ipo.setId(1L);
		when(ipoDetailsRepository.getById(ArgumentMatchers.anyLong())).thenReturn(ipo);
		IPODetails res = ipoDetailsServicesImpl.findById(1L);
		assertEquals(ipo, res);
	}

	@Test
	public void deleteByIdTest() {
		IPODetails ipo = new IPODetails();
		ipo.setId(1L);
		
		when(ipoDetailsRepository.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(ipo));
		
		Long res = ipoDetailsServicesImpl.deleteById(1L);
		Long res1 = ipoDetailsServicesImpl.deleteById(2L);
		assertEquals(1L, res);
		assertEquals(null, res1);
	}

}
