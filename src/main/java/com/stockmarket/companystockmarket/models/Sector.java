package com.stockmarket.companystockmarket.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "Sector")
public class Sector {
	
	public Sector(Long i, String string, String string2) {
		this.id = i;
		this.sectorName = string;
		this.brief = string2;
	}


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;


	@NonNull
	private String sectorName;


	@NonNull
	private String brief;


	@OneToMany(mappedBy = "sector", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<Company> companies = new ArrayList<>();

}
