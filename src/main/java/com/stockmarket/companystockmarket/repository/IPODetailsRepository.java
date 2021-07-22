package com.stockmarket.companystockmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.Company;
import com.stockmarket.companystockmarket.models.IPODetails;

@Repository
public interface IPODetailsRepository extends JpaRepository<IPODetails,Long> {

	IPODetails findByCompany(Company company);
}
