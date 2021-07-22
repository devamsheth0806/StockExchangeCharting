package com.stockmarket.companystockmarket.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.Sector;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.SectorRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.SectorServices;

@Service
public class SectorServicesImpl implements SectorServices {

	@Autowired
	SectorRepository sectorRepo;

	@Autowired
	CompanyServices compServices;

	@Override
	public Sector addSector(Sector sector) {
		if (sectorRepo.findById(sector.getId()).isPresent()
				|| sectorRepo.findSectorBySectorName(sector.getSectorName()) != null)
			return null;
		return sectorRepo.save(sector);
	}

	@Override
	public Sector updateSector(Sector sector) {
		if (sectorRepo.findById(sector.getId()).isEmpty()
				|| sectorRepo.findSectorBySectorName(sector.getSectorName()) == null)
			return null;
		sector = sectorRepo.save(sector);
		return sector;
	}

	@Override
	public List<Sector> getSectors() {
		return sectorRepo.findAll();
	}

	@Override
	public Sector findById(Long id) {
		return sectorRepo.findById(id).get();
	}

	@Override
	public Sector findByName(String name) {
		return sectorRepo.findSectorBySectorNameIgnoreCaseContaining(name);
	}

	@Override
	public Long deleteById(Long id) {
		if (!sectorRepo.findById(id).isPresent())
			return null;
		sectorRepo.deleteById(id);
		return id;
	}

	@Override
	public List<Company> getCompaniesBySector(Long sectorId) {
		return sectorRepo.findCompaniesBySector(sectorId);
	}

	@Override
	public Double getSectorPrice(Long id, LocalDate from, LocalDate to) {
		Double sectorPrice = 0.0;
		Integer count = 0;
		List<Company> companies = sectorRepo.findCompaniesBySector(id);
		for (Company company : companies) {
			for (StockPrice stockPrice : compServices.getCompanyStockPrice(company.getId(), from, to)) {
				sectorPrice += stockPrice.getSharePrice();
				count++;
			}
			;
		}
		;
		sectorPrice = sectorPrice / count;
		return sectorPrice;
	}

	@Override
	public Double getSectorPrice(Long id) {
		Double sectorPrice = 0.0;
		Integer count = 0;
		List<Company> companies = sectorRepo.findCompaniesBySector(id);
		for (Company company : companies) {
			for (StockPrice stockPrice : compServices.getCompanyStockPrice(company.getId())) {
				sectorPrice += stockPrice.getSharePrice();
				count++;
			}
			;
		}
		;
		sectorPrice = sectorPrice / count;
		return sectorPrice;
	}
}
