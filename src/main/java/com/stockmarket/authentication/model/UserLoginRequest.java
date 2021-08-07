package com.stockmarket.authentication.model;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserLoginRequest {
	@NonNull
	private String username;
	@NonNull
	private String password;

}
