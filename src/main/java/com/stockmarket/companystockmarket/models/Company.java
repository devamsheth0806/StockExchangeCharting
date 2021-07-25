package com.stockmarket.companystockmarket.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Company")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NonNull
	private String companyName;


	@NonNull
	private Double turnover;


	@NonNull
	private String ceo;

	@Transient
	private String sectorName;
	
	@NonNull
	@Type(type = "text")
	private String boardOfDirectors;


	@NonNull
	@Type(type = "text")
	private String companyBrief;


	@OneToOne(fetch = FetchType.LAZY, mappedBy = "company", cascade = CascadeType.REMOVE)
	private IPODetails ipo;
		
	@OneToMany(targetEntity = CompanyStockExchangeMap.class, mappedBy = "company",cascade = CascadeType.REMOVE)
	@JsonIgnore
	private List<CompanyStockExchangeMap> companyStockMap;


	@ManyToOne(fetch = FetchType.LAZY)
	private Sector sector;
	
	@OneToMany(targetEntity = StockPrice.class, mappedBy = "company", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<StockPrice> stockPrices;
	
}
