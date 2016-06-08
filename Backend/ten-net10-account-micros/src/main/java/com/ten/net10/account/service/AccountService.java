package com.ten.net10.account.service;

import com.ten.net10.account.dto.UserDTO;

public interface AccountService {
	
	public UserDTO setup(UserDTO userDTO);
	public void modify(UserDTO userDTO);
	public UserDTO findById(String id);
	public UserDTO findByUsername(String username);
	
}
