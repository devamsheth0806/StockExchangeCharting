package com.stockmarket.authentication.controller;

import java.io.IOException;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.authentication.jwt.JwtTokenUtil;
import com.stockmarket.authentication.model.AppUser;
import com.stockmarket.authentication.model.JwtResponse;
import com.stockmarket.authentication.model.UserLoginRequest;
import com.stockmarket.authentication.model.Userdetails1;
import com.stockmarket.authentication.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(path = "/users", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@GetMapping(path = "/")
	public ResponseEntity<List<AppUser>> getAllUsers() {
		List<AppUser> users = userService.getAllUsers();
		return ResponseEntity.ok(users);
	}

	@PostMapping(path = "/login", produces = "application/json")
	public ResponseEntity<?> login(@RequestBody UserLoginRequest userLoginRequest) throws Exception {
		final Userdetails1 userDetails = userService.loadUserByUsername(userLoginRequest.getUsername());
		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Credentials");
		}
		if (!userDetails.isConfirmed()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not confirmed");
		}
		authenticate(userLoginRequest.getUsername(), userLoginRequest.getPassword());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping(path = "/adminlogin", produces = "application/json")
	public ResponseEntity<?> adminLogin(@RequestBody UserLoginRequest userLoginRequest) throws Exception {
		final Userdetails1 userDetails = userService.loadUserByUsername(userLoginRequest.getUsername());
		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid Credentials");
		}
		if (!userDetails.isConfirmed()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not confirmed");
		}
		if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN")))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unauthorized");
		authenticate(userLoginRequest.getUsername(), userLoginRequest.getPassword());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping(path = "/signup", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> signup(@RequestBody AppUser user)
			throws AddressException, MessagingException, IOException {
		user = userService.signup(user);
		if (user == null) {
			return ResponseEntity.badRequest().body("User already exists");
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(user);
	}

	@PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> update(@RequestBody AppUser user) {
		user = userService.update(user);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		return ResponseEntity.ok(user);
	}

	@DeleteMapping(path = "/delete/{id}", produces = "application/json")
	public ResponseEntity<?> delete(@PathVariable Long id) {
		Long userResponse = userService.delete(id);
		if (userResponse == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		return ResponseEntity.ok(userResponse);
	}

	@GetMapping(path = "/confirm/{id}", produces = "application/json")
	public ResponseEntity<?> confirmUser(@PathVariable Long id) {
		AppUser userResponse = userService.activate(id);
		if (userResponse == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		return ResponseEntity.ok(userResponse.getUsername() + " Confirmed!!!");
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}
		catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		catch (AuthenticationException e) {
			throw new Exception("INVALID_CREDENTIALS", e); 
		}
	}

}
