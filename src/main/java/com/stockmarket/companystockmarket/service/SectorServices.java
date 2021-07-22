package com.stockmarket.companystockmarket.service;

import java.time.LocalDate;
import java.util.List;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.Sector;

public interface SectorServices {
	
	public Sector addSector(Sector sector);
	public Sector updateSector(Sector sector);
	public List<Sector> getSectors();
	public Sector findById(Long id);
	public Sector findByName(String name);
	public Long deleteById(Long id);
	public List<Company> getCompaniesBySector(Long sectorId);
	public Double getSectorPrice(Long id, LocalDate from, LocalDate to);
	public Double getSectorPrice(Long id);

}
