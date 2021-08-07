package com.stockmarket.authentication.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockmarket.authentication.model.AppUser;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long>{

	AppUser findByUsernameOrEmail(String username, String email);
	AppUser findByUsername(String username);
	Optional<AppUser> findById(Long id);
	AppUser findByUsernameAndPassword(String username, String password);

}
