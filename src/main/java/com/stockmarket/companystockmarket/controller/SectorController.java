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
import com.stockmarket.companystockmarket.models.Sector;
import com.stockmarket.companystockmarket.service.SectorServices;

@RestController
@CrossOrigin
@RequestMapping(
		value="/sectors",
		method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class SectorController {

	@Autowired
	private SectorServices sectorServices;
	
	@GetMapping("")
	public ResponseEntity<List<Sector>>  getSectors(){
		List<Sector> sectors = sectorServices.getSectors();
		return ResponseEntity.ok(sectors);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getSectorById(@PathVariable Long id){
		Sector sector = sectorServices.findById(id);
		if (sector==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sector not found");
		}
		return ResponseEntity.ok(sector);
	}
	
	@GetMapping("/{id}/companiesbysector")
	public ResponseEntity<?> getCompaniesBySector(@PathVariable Long id){
		List<Company> companies = sectorServices.getCompaniesBySector(id);
		if (companies==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sector not found");
		}
		return ResponseEntity.ok(companies);
	}
	
	@GetMapping("/{id}/sectorprice")
	public ResponseEntity<?> getSectorPrice(
			@PathVariable Long id,
			@RequestParam(name = "from", required=false) @DateTimeFormat(iso = ISO.DATE) LocalDate from,
			@RequestParam(name = "to", required=false) @DateTimeFormat(iso = ISO.DATE) LocalDate to){
		Double stockPrices;
		if(from == null)
			stockPrices = sectorServices.getSectorPrice(id);
		else
			stockPrices = sectorServices.getSectorPrice(id, from, to);
		return ResponseEntity.ok(stockPrices);
	}
	
	@PostMapping(path = "/add", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> addSector(@RequestBody Sector sector){
		sector = sectorServices.addSector(sector);
		if (sector==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sector already registered");
		}
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(sector.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping(path = "/update", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> updateSector(@RequestBody Sector sector){
		sector = sectorServices.updateSector(sector);
		if (sector==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sector not found");
		}
		return ResponseEntity.ok(sector);
	}
	
	@DeleteMapping(path = "/delete/{id}", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> deleteSector(@PathVariable Long id){
		id = sectorServices.deleteById(id);
		if (id==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sector not found");
		}
		return ResponseEntity.ok(id);
	}
}
