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

import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.service.StockPriceServices;

@RestController
@CrossOrigin
@RequestMapping(value = "/stockprices", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class StockPriceController {
	@Autowired
	private StockPriceServices stockPriceServices;

	@GetMapping("")
	public ResponseEntity<List<StockPrice>> getCompanies() {
		List<StockPrice> stockPrices = stockPriceServices.getStockPrice();
		return ResponseEntity.ok(stockPrices);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getStockPrice(@PathVariable Long id) {
		StockPrice stockPrice = stockPriceServices.findById(id);
		if (stockPrice == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("StockPrice not found");
		}
		return ResponseEntity.ok(stockPrice);
	}

	@PostMapping(path = "/add", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> addStockPrice(@RequestBody List<StockPrice> stockPrices) {
		for (StockPrice stockPrice : stockPrices) {
			stockPrice = stockPriceServices.addStockPrice(stockPrice);
			if (stockPrice == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("StockPrice already registered");
			}
		}
//		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(stockPrice.getId())
//				.toUri();
		return ResponseEntity.ok("Stock Prices Added");
	}

	@PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> updateStockPrice(@RequestBody StockPrice stockPrice) {
		stockPrice = stockPriceServices.updateStockPrice(stockPrice);
		if (stockPrice == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("StockPrice not found");
		}
		return ResponseEntity.ok(stockPrice);
	}

	@DeleteMapping(path = "/delete/{id}", produces = "application/json")
	public ResponseEntity<?> deleteStockPrice(@PathVariable Long id) {
		id = stockPriceServices.deleteById(id);
		if (id == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("StockPrice not found");
		}
		return ResponseEntity.ok(id);
	}
}
