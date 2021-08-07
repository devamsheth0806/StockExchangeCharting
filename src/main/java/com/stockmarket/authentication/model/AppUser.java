package com.stockmarket.authentication.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="AppUser")
public class AppUser {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@NonNull
	private String username;
	@NonNull
	private String password;
	@NonNull
	private String email;
	@NonNull
	private String mobile;
	
	@NonNull
	private String role;
	private Boolean confirmed;
}
