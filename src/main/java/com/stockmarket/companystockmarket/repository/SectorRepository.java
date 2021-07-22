package com.stockmarket.companystockmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.Sector;

@Repository
public interface SectorRepository extends JpaRepository<Sector, Long> {

	Sector findSectorBySectorName(String name);

	Sector findSectorBySectorNameIgnoreCaseContaining(String name);

	@Query("Select s.companies from Sector s where s.id=:id")
	List<Company> findCompaniesBySector(Long id);

}
