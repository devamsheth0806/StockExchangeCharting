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

import com.stockmarket.companystockmarket.models.IPODetails;
import com.stockmarket.companystockmarket.service.IPODetailsServices;

@RestController
@CrossOrigin
@RequestMapping(
		value = "/ipos",
		method = {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})
public class IPODetailsController {
	@Autowired
	private IPODetailsServices ipoDetailsServices;
	
	@GetMapping("")
	public ResponseEntity<List<IPODetails>> getCompanies(){
		List<IPODetails> ipoDetails = ipoDetailsServices.getIPODetails();
		return ResponseEntity.ok(ipoDetails);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getIPODetails(@PathVariable Long id){
		IPODetails ipoDetails = ipoDetailsServices.findById(id);
		if (ipoDetails==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("IPODetails not found");
		}
		return ResponseEntity.ok(ipoDetails);
	}
	
	@PostMapping(path = "/add", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> addIPODetails(@RequestBody IPODetails ipoDetails){
		ipoDetails = ipoDetailsServices.addIPODetails(ipoDetails);
		if (ipoDetails==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("IPODetails already registered");
		}
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(ipoDetails.getId())
				.toUri();
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping(path = "/update", consumes="application/json" , produces = "application/json")
	public ResponseEntity<?> updateIPODetails(@RequestBody IPODetails ipoDetails){
		ipoDetails = ipoDetailsServices.updateIPODetails(ipoDetails);
		if (ipoDetails==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("IPODetails not found");
		}
		return ResponseEntity.ok(ipoDetails);
	}
	
	@DeleteMapping(path = "/delete/{id}", produces = "application/json")
	public ResponseEntity<?> deleteIPODetails(@PathVariable Long id){
		id = ipoDetailsServices.deleteById(id);
		if (id==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("IPODetails not found");
		}
		return ResponseEntity.ok(id);
	}
}
