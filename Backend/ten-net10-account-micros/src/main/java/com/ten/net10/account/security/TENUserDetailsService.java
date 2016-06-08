package com.ten.net10.account.security;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.ten.net10.account.entity.User;
import com.ten.net10.account.persistence.UserRepository;

@Component
public class TENUserDetailsService implements UserDetailsService{
	
	private static final Logger logger = Logger.getLogger(TENUserDetailsService.class);
	
	@Autowired  
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByUsername(username);
		
		if(user == null) {
			logger.error("User not found");
			throw new UsernameNotFoundException(String.format("User with the username %s can not be found", username));
		}
		
//		List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		String authoritiesStr = user.getAuthorities();
		
		if (authoritiesStr.indexOf(",")== -1)// user has 1 role only
		{
			List<GrantedAuthority> grantedAuthorities = AuthorityUtils.createAuthorityList(authoritiesStr);
			authorities.addAll(grantedAuthorities);
		}else { // user has multiple roles
			String[] authoritiesStrArr = authoritiesStr.split(",");
			for (String authorityStr: authoritiesStrArr){
				authorities.addAll(AuthorityUtils.createAuthorityList(authorityStr));
			}
		}
		
//		for (Authority authority : user.getAuthorities())
//			grantedAuthorities.addAll(AuthorityUtils.createAuthorityList(authority.getName()));	
		
		UserDetails userDetails = new org.springframework.security.core.userdetails.
				User(user.getId(), user.getPassword(), authorities);
		
		return userDetails;
	}

}
