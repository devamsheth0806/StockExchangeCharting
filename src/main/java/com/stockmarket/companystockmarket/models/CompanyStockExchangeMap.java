package com.stockmarket.companystockmarket.models;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CompanyStockExchangeMap")
public class CompanyStockExchangeMap {
	@Id
	@GeneratedValue
	private long id;
	
	@NonNull
	private String companyCode;
	
	@Transient
	private String companyName;
	
	@Transient
	private String stockExchangeName;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Company company;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL )
	private StockExchange stockExchange;

}
