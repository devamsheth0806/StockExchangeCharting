package com.stockmarket.companystockmarket.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "StockExchange")
public class StockExchange {
	@Id
	@GeneratedValue
	private long id;
	
	@NonNull
	private String name;
	
	@NonNull
	private String brief;
	
	@NonNull
	private String address;
	
	@NonNull
	private String remarks;
	
	@OneToMany(targetEntity = CompanyStockExchangeMap.class, mappedBy = "stockExchange",cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<CompanyStockExchangeMap> companyStockMap;

}
