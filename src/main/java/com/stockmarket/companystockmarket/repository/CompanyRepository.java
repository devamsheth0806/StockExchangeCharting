package com.stockmarket.companystockmarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.Company;

@Repository
public interface CompanyRepository  extends JpaRepository<Company,Long> {
   Company findCompanyByCompanyName(String Name);
   List<Company> findCompanyByCompanyNameIgnoreCaseContaining(String pattern);
}