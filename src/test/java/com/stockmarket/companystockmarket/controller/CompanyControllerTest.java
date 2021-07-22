package com.stockmarket.companystockmarket.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.impl.CompanyServicesImpl;

public class CompanyControllerTest {

	CompanyServices companyServices = new CompanyServicesImpl();
	
	@Test
	public void getCompaniesTest(){
		List<Company> companies = companyServices.getCompanies();
		assertEquals(companies,new ArrayList<>());
	}
	
}
