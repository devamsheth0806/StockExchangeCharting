package com.stockmarket.authentication.service;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.stockmarket.authentication.model.AppUser;
import com.stockmarket.authentication.model.Userdetails1;

public interface UserService extends UserDetailsService{
	
	public Userdetails1 loadUserByUsername(String username);
	public List<AppUser> getAllUsers();
	public AppUser activate(Long token);
	public AppUser signup(AppUser user) throws AddressException, MessagingException, IOException;
	public AppUser login(String username, String password);
	public AppUser update(AppUser user);
	public Long delete(Long id);
}
