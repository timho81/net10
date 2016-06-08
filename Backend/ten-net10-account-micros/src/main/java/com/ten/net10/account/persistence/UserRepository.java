package com.ten.net10.account.persistence;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ten.net10.account.entity.User;                                                              

public interface UserRepository extends MongoRepository<User, String>{
	
	public User findByUsername(String username);

}
