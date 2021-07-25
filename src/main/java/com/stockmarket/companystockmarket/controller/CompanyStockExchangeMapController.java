package com.stockmarket.companystockmarket.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.stockmarket.companystockmarket.models.CompanyStockExchangeMap;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.service.CompanyStockExchangeMapServices;

@RestController
@CrossOrigin
@RequestMapping(
		value = "/companystockmap",
		method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class CompanyStockExchangeMapController {

	@Autowired
	CompanyStockExchangeMapServices companyStockExchangeMapServices;
	
	@GetMapping("")
	public ResponseEntity<List<CompanyStockExchangeMap>> getAllMaps(){
		return ResponseEntity.ok(companyStockExchangeMapServices.getAllCompanyStockExchangeMaps());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getCompanyStockExchangeMap(@PathVariable Long id){
		CompanyStockExchangeMap companyStockExchangeMap = companyStockExchangeMapServices.findById(id);
		if (companyStockExchangeMap==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CompanyStockExchangeMap not found");
		}
		return ResponseEntity.ok(companyStockExchangeMap);
	}
	
	@PostMapping(path = "/getCompanies", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> getByStockExchange(@RequestBody StockExchange stockExchange) {
		List<CompanyStockExchangeMap> companies = companyStockExchangeMapServices.findByStockExchange(stockExchange);
		if (companies == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock Exchange not found");
		}
		return ResponseEntity.ok(companies);
	}
	
	@PostMapping(path = "/add", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> addCompanyStockExchangeMap(@RequestBody CompanyStockExchangeMap companyStockExchangeMap){
		companyStockExchangeMap = companyStockExchangeMapServices.addCompanyStockExchangeMap(companyStockExchangeMap);
		if (companyStockExchangeMap==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("CompanyStockExchangeMap already registered");
		}
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(companyStockExchangeMap.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping(path = "/update", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> updateCompanyStockExchangeMap(@RequestBody CompanyStockExchangeMap companyStockExchangeMap){
		companyStockExchangeMap = companyStockExchangeMapServices.updateCompanyStockExchangeMap(companyStockExchangeMap);
		if (companyStockExchangeMap==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CompanyStockExchangeMap not found");
		}
		return ResponseEntity.ok(companyStockExchangeMap);
	}
	
	@DeleteMapping(path = "/delete/{id}" , produces = "application/json")
	public ResponseEntity<?> deleteCompanyStockExchangeMap(@PathVariable Long id){
		id = companyStockExchangeMapServices.deleteById(id);
		if (id==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("CompanyStockExchangeMap not found");
		}
		return ResponseEntity.ok(id);
	}
	
}
