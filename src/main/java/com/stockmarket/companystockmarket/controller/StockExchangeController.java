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

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.StockExchange;
import com.stockmarket.companystockmarket.service.StockExchangeServices;

@RestController
@CrossOrigin
@RequestMapping(
		value = "/stockExchanges", 
		method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,RequestMethod.DELETE })
public class StockExchangeController {

	@Autowired
	StockExchangeServices stockExchangeServices;

	@GetMapping("")
	public ResponseEntity<List<StockExchange>> getStockExchanges() {
		return ResponseEntity.ok(stockExchangeServices.getStockExchangesList());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getStockExchangeById(@PathVariable Long id) {
		StockExchange stockExchange = stockExchangeServices.findById(id);
		if (stockExchange == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock Exchange not found");
		}
		return ResponseEntity.ok(stockExchange);
	}

	@GetMapping("/{id}/stockexchangecompanies")
	public ResponseEntity<?> getCompaniesByStockExchange(@PathVariable Long id) {
		List<Company> companies = stockExchangeServices.getCompanies(id);
		if (companies == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Stock Exchange not found");
		}
		return ResponseEntity.ok(companies);
	}

	@PostMapping(path = "/add", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> addStockExchange(@RequestBody StockExchange stockExchange) {
		stockExchange = stockExchangeServices.addStockExchange(stockExchange);
		if (stockExchange == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("StockExchange already registered");
		}
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(stockExchange.getId()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> updateStockExchange(@RequestBody StockExchange stockExchange) {
		stockExchange = stockExchangeServices.updateStockExchange(stockExchange);
		if (stockExchange == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("StockExchange not found");
		}
		return ResponseEntity.ok(stockExchange);
	}

	@DeleteMapping(path = "/delete/{id}", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> deleteStockExchange(@PathVariable Long id) {
		id = stockExchangeServices.deleteStockExchange(id);
		if (id == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("StockExchange not found");
		}
		return ResponseEntity.ok(id);
	}
}
