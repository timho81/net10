package com.ten.net10.account.service;

import java.util.UUID;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ten.net10.account.dto.UserDTO;
import com.ten.net10.account.entity.User;
import com.ten.net10.account.persistence.UserRepository;

@Service
public class AccountServiceImpl  implements AccountService{
	
	private static final Logger logger = Logger.getLogger(AccountServiceImpl.class);
	
	private UserRepository userRepository;
	
	@Autowired
	public AccountServiceImpl(UserRepository userRepository){
		this.userRepository = userRepository;
	}
	
	@Override
	public UserDTO setup(UserDTO userDTO){
		User u = new User();
		
		String uuid = UUID.randomUUID().toString();
		userDTO.setId(uuid);
		
    	u.setId(uuid);
    	u.setUsername(userDTO.getUsername());
    	
//		Hashed password 
		u.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
    	u.setFirstName(userDTO.getFirstName());
    	u.setLastName(userDTO.getLastName());
    	u.setEmail(userDTO.getEmail());
    	u.setAuthorities(userDTO.getAuthorities());
    	
        userRepository.save(u);
        
        logger.info("A new account has been set up");
        
        return userDTO;
	}
	
	@Override
	public void modify(UserDTO userDTO){
    	User u = userRepository.findOne(userDTO.getId());    	
//    	User u = userRepository.findByUsername(userDTO.getUsername());  
    	
//    	userId/username are non-editable/unmodifiable
    	
    	u.setFirstName(userDTO.getFirstName());
    	u.setLastName(userDTO.getLastName());
    	u.setEmail(userDTO.getEmail());
    	
    	u.setAuthorities(userDTO.getAuthorities());
    	
    	userRepository.save(u);
    	
    	logger.info("The account has been modified");
	}
	
	@Override
	public UserDTO findById(String id){
		UserDTO userDTO = new UserDTO();
		
		User u = userRepository.findOne(id);
		
		if (u == null)
			return null;
		
		userDTO.setId(u.getId());
		userDTO.setUsername(u.getUsername());
		
		userDTO.setFirstName(u.getFirstName());
		userDTO.setLastName(u.getLastName());
		userDTO.setEmail(u.getEmail());
    	
		userDTO.setAuthorities(u.getAuthorities());
		
		return userDTO;
	}
	
	@Override
	public UserDTO findByUsername(String username)
	{
		UserDTO userDTO = new UserDTO();
		
		User u = userRepository.findByUsername(username);
		
		if (u == null)
			return null;
		
		userDTO.setId(u.getId());
		userDTO.setUsername(u.getUsername());
		
		userDTO.setFirstName(u.getFirstName());
		userDTO.setLastName(u.getLastName());
		userDTO.setEmail(u.getEmail());
    	
		userDTO.setAuthorities(u.getAuthorities());		
		
		return userDTO;
	}

}
