package com.stockmarket.companystockmarket.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "StockPrice")
public class StockPrice {
	@Id
	@GeneratedValue
	private long id;
	
	@NonNull
	private String exchangeName;
	
	@NonNull
	private String companyCode;
	
	private LocalDateTime localDateTime;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Company company;

	private LocalDate datee;
	private LocalTime timee;
	
	private Double sharePrice;

}
