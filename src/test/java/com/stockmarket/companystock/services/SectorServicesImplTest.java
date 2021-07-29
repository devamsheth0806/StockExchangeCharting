package com.stockmarket.companystock.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.Sector;
import com.stockmarket.companystockmarket.models.StockPrice;
import com.stockmarket.companystockmarket.repository.SectorRepository;
import com.stockmarket.companystockmarket.service.CompanyServices;
import com.stockmarket.companystockmarket.service.SectorServices;
import com.stockmarket.companystockmarket.service.impl.SectorServicesImpl;

@SpringBootTest(classes = SectorServices.class)
public class SectorServicesImplTest {

	@InjectMocks
	SectorServicesImpl sectorServicesImpl;

	@Mock
	SectorRepository sectorRepo;

	@Mock
	CompanyServices compServices;

	@Test
	public void addSectorTest() {
		Sector sector = new Sector();
		sector.setId(1L);
		sector.setSectorName("s1");

		Sector sector2 = new Sector();
		sector2.setId(2L);
		sector2.setSectorName("s2");

		Sector sector3 = new Sector();
		sector3.setId(3L);
		sector3.setSectorName("s3");

		when(sectorRepo.findById(ArgumentMatchers.eq(2L))).thenReturn(Optional.of(sector2));
		when(sectorRepo.findSectorBySectorName(ArgumentMatchers.eq("s3"))).thenReturn(sector3);
		when(sectorRepo.save(ArgumentMatchers.eq(sector))).thenReturn(sector);

		Sector res = sectorServicesImpl.addSector(sector);
		Sector res1 = sectorServicesImpl.addSector(sector2);
		Sector res2 = sectorServicesImpl.addSector(sector3);

		assertEquals(sector, res);
		assertEquals(null, res1);
		assertEquals(null, res2);

	}

	@Test
	public void updateSectorTest() {
		Sector sector = new Sector();
		sector.setId(1L);
		sector.setSectorName("s1");

		Sector sector2 = new Sector();
		sector2.setId(2L);
		sector2.setSectorName("s2");

		Sector sector3 = new Sector();
		sector3.setId(3L);
		sector3.setSectorName("s3");

		when(sectorRepo.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(sector));
		when(sectorRepo.findById(ArgumentMatchers.eq(3L))).thenReturn(Optional.of(sector3));
		when(sectorRepo.findSectorBySectorName(ArgumentMatchers.eq("s3"))).thenReturn(sector);
		when(sectorRepo.findSectorBySectorName(ArgumentMatchers.eq("s1"))).thenReturn(sector);
		when(sectorRepo.save(ArgumentMatchers.eq(sector))).thenReturn(sector);

		Sector res = sectorServicesImpl.updateSector(sector);
		Sector res1 = sectorServicesImpl.updateSector(sector2);
		Sector res2 = sectorServicesImpl.updateSector(sector3);

		assertEquals(null, res1);
		assertEquals(null, res2);
		assertEquals(sector, res);
	}

	@Test
	public void getSectorstest() {
		List<Sector> sectors = new ArrayList<>();

		when(sectorRepo.findAll()).thenReturn(sectors);

		List<Sector> res = sectorServicesImpl.getSectors();

		assertEquals(sectors, res);

	}

	@Test
	public void findByIdtest() {
		Sector s = new Sector();
		when(sectorRepo.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(s));

		Sector res = sectorServicesImpl.findById(1L);
		assertEquals(s, res);
	}

	@Test
	public void findByNametest() {
		Sector s = new Sector();
		when(sectorRepo.findSectorBySectorNameIgnoreCaseContaining(ArgumentMatchers.eq("s1"))).thenReturn(s);

		Sector res = sectorServicesImpl.findByName("s1");
		assertEquals(s, res);
	}

	@Test
	public void deleteByIdTest() {
		Sector s = new Sector();
		s.setId(1L);
		Sector s1 = new Sector();
		s1.setId(2L);

		when(sectorRepo.findById(ArgumentMatchers.eq(1L))).thenReturn(Optional.of(s));

		Long res = sectorServicesImpl.deleteById(1L);
		Long res1 = sectorServicesImpl.deleteById(2L);
		assertEquals(1L, res);
		assertEquals(null, res1);
	}

	@Test
	public void getCompaniesBySectorTest() {
		List<Company> companies = new ArrayList<>();

		when(sectorRepo.findCompaniesBySector(1L)).thenReturn(companies);

		List<Company> res = sectorServicesImpl.getCompaniesBySector(1L);

		assertEquals(companies, res);
	}

	@Test
	public void getSectorPriceTest() {
		Sector s = new Sector();
		s.setId(1L);
		
		StockPrice stockPrice = new StockPrice();
		stockPrice.setId(1L);
		stockPrice.setDatee(LocalDate.of(2021, 1, 2));
		stockPrice.setSharePrice(2.0);

		StockPrice stockPrice2 = new StockPrice();
		stockPrice.setId(2L);
		stockPrice2.setDatee(LocalDate.of(2021, 1, 2));
		stockPrice2.setSharePrice(2.0);
		
		List<StockPrice> stockPrices = Arrays.asList(stockPrice, stockPrice2);
		
		List<Company> companies = new ArrayList<>();
		Company c = new Company();
		c.setId(1L);
		companies.add(c);
		when(sectorRepo.findCompaniesBySector(1L)).thenReturn(companies);
		when(compServices.getCompanyStockPrice(ArgumentMatchers.anyLong())).thenReturn(stockPrices);
		when(compServices.getCompanyStockPrice(1L, LocalDate.of(2021, 1, 1),LocalDate.of(2021, 1, 2))).thenReturn(stockPrices);
		
		Double res = sectorServicesImpl.getSectorPrice(1L);
		Double res1 = sectorServicesImpl.getSectorPrice(1L, LocalDate.of(2021, 1, 1),LocalDate.of(2021, 1, 2));
		
		assertEquals(2.0, res);
		assertEquals(2.0, res1);
	}
}