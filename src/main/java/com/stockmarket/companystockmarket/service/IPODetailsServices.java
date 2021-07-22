package com.stockmarket.companystockmarket.service;

import java.util.List;

import com.stockmarket.companystockmarket.models.IPODetails;

public interface IPODetailsServices {
	public IPODetails addIPODetails(IPODetails ipoDetails);
	public IPODetails updateIPODetails(IPODetails ipoDetails);
	public List<IPODetails> getIPODetails();
	public IPODetails findById(Long id);
	public Long deleteById(Long id);

}
