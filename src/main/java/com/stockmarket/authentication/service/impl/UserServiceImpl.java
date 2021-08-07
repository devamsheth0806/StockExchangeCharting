package com.stockmarket.authentication.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.stockmarket.authentication.model.AppUser;
import com.stockmarket.authentication.model.Userdetails1;
import com.stockmarket.authentication.repository.UserRepository;
import com.stockmarket.authentication.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Value("${sendgrid.mail.username}")
	private String userName;

	@Override
	public List<AppUser> getAllUsers() {
		return userRepository.findAll();
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		AppUser user = new AppUser();
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(user.getRole()));
		return authorities;
	}

	@Override
	public AppUser signup(AppUser user) throws AddressException, MessagingException, IOException {
		if (userRepository.findById(user.getId()).isPresent()
				|| userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail()) != null)
			return null;
		user.setConfirmed(false);
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		user = userRepository.save(user);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "UserController");
		headers.add("Access-Control-Allow-Origin", "*");
		sendemail(user.getId());
		return user;
	}

	public void sendemail(Long userid) throws AddressException, MessagingException, IOException {

		AppUser user = userRepository.getById(userid);

		final String username = this.userName;

		Email from = new Email(username);
		String subject = "User confirmation email";
		Email to = new Email(user.getEmail());
		Content content = new Content("text/html", String.format(
				"<h1><a href =\"https://devam-stock-auth.herokuapp.com/users/confirm/%s\"> Click to confirm </a></h1>",
				userid));
		Mail mail = new Mail(from, subject, to, content);
		SendGrid sg = new SendGrid(System.getenv("SENDGRID_APIKEY"));
		Request request = new Request();
		request.setMethod(Method.POST);
		request.setEndpoint("mail/send");
		request.setBody(mail.build());
		Response response = sg.api(request);
		System.out.println(response.getStatusCode());
		System.out.println(response.getBody());
		System.out.println(response.getHeaders());

	}

	@Override
	public AppUser update(AppUser user) {
		if (userRepository.findById(user.getId()).isPresent())
			return null;
		AppUser userResponse = userRepository.save(user);
		return userResponse;
	}

	@Override
	public AppUser login(String username, String password) {
		AppUser userResponse = userRepository.findByUsernameAndPassword(username, password);
		return userResponse;
	}

	@Override
	public Userdetails1 loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser user = userRepository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
		return new Userdetails1(user);
	}

	@Override
	public Long delete(Long id) {
		AppUser userResponse = userRepository.findById(id).get();
		if (userResponse == null)
			return null;
		userRepository.delete(userResponse);
		return id;
	}

	@Override
	public AppUser activate(Long token) {
		AppUser user = userRepository.findById(token).get();
		if (user == null)
			return null;
		user.setConfirmed(true);
		user = userRepository.save(user);
		return user;
	}

}
