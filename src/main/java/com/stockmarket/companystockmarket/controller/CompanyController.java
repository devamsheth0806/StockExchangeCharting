package com.stockmarket.companystockmarket.controller;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.service.CompanyServices;

@RestController
@CrossOrigin
@RequestMapping(
		value = "/companies", 
		method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE}
		)
public class CompanyController {
	
	@Autowired
	private CompanyServices companyServices;
	
	@GetMapping("")
	public ResponseEntity<List<Company>> getCompanies(){
		List<Company> companies = companyServices.getCompanies();
		return ResponseEntity.ok(companies);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<Company>> getMatchingCompanies(@RequestParam("companyName") String companyName){
		List<Company> companies = companyServices.getMatchingCompanies(companyName);
		return ResponseEntity.ok(companies);
	}
	
	@GetMapping("/getByName")
	public ResponseEntity<?> getCompanyByName(@RequestParam("companyName") String companyName){
		Company company = companyServices.findByName(companyName);
		if (company==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(company);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getCompany(@PathVariable Long id){
		Company company = companyServices.findById(id).get();
		if (company==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(company);
	}
	
	@GetMapping("/{id}/stockexchanges")
	public ResponseEntity<?> getCompanyStockExchanges(@PathVariable Long id){
		List<StockExchange> stockExchanges = companyServices.getStockExchanges(id);
		if (stockExchanges==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(stockExchanges);
	}
	
	@GetMapping("/{id}/ipo")
	public ResponseEntity<?> getCompanyIPODetails(@PathVariable Long id){
		IPODetails ipoDetails = companyServices.getCompanyIpoDetails(id);
		if (ipoDetails==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(ipoDetails);
	}
	
	@GetMapping("/{id}/stockprice")
	public ResponseEntity<?> getCompanyStockPricesWithinTimePeriod(
			@PathVariable Long id,
			@RequestParam(name = "from", required=false) @DateTimeFormat(iso = ISO.DATE) LocalDate from,
			@RequestParam(name = "to", required=false) @DateTimeFormat(iso = ISO.DATE) LocalDate to){
		List<StockPrice> stockPrices;
		if(from == null)
			 stockPrices = companyServices.getCompanyStockPrice(id);
		else
			stockPrices = companyServices.getCompanyStockPrice(id, from, to);
		if (stockPrices==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(stockPrices);
	}
	
	@PostMapping(path = "/add", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> addCompany(@RequestBody Company company){
		company = companyServices.addCompany(company);
		if (company==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Company already registered");
		}
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(company.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping(path = "/update", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> updateCompany(@RequestBody Company company){
		company = companyServices.updateCompany(company);
		if (company==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(company);
	}
	
	@DeleteMapping(path = "/delete/{id}", produces = "application/json")
	public ResponseEntity<?> deleteCompany(@PathVariable Long id){
		id = companyServices.deleteCompany(id);
		if (id==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
		}
		return ResponseEntity.ok(id);
	}
	
}
