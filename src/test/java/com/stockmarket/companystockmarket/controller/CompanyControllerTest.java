package com.stockmarket.companystockmarket.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarket.companystockmarket.jwt.JwtRequestFilter;
import com.stockmarket.companystockmarket.jwt.JwtTokenUtil;
import com.stockmarket.companystockmarket.jwt.WebSecurityConfig;
import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.Sector;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.impl.CompanyServicesImpl;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(controllers = CompanyController.class)
public class CompanyControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;
	
	@MockBean
	private JwtTokenUtil jwtTokenUtil;

	@MockBean
	private WebSecurityConfig webSecurityConfig;
	
	@MockBean
	private JwtRequestFilter jwtRequestFilter;
	
	@MockBean
	private CompanyServices companyServices;

	@MockBean
	private Sector sector1;

	@MockBean
	private IPODetails ipo1;

	@MockBean
	private List<CompanyStockExchangeMap> companyStockMap;

	@MockBean
	private List<StockPrice> stockPrices;

	
	@Test
	@WithMockUser(authorities ={"ADMIN"}, username="devam")
	public void addCompaniesTest() throws Exception {
		Company company = new Company(1L, "sample1", 234.44, "sds aws", "Finance", "asda, asd, as", "very well known",
				ipo1, companyStockMap, sector1, stockPrices);
		Mockito.when(companyServices.addCompany(ArgumentMatchers.any())).thenReturn(company);
		mockMvc.perform(post("/companies/add")
				.contentType("application/json")
		        .content(objectMapper.writeValueAsString(company)))
		        .andExpect(status().isOk());
        
	}

}
