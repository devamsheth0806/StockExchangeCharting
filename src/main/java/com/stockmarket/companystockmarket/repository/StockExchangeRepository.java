package com.stockmarket.companystockmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmarket.companystockmarket.models.StockExchange;

@Repository
public interface StockExchangeRepository  extends JpaRepository<StockExchange,Long> {
	StockExchange findByName(String Name);
}
