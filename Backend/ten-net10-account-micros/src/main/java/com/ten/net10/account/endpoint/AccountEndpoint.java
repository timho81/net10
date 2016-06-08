package com.ten.net10.account.endpoint;

import javax.validation.Valid;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ten.net10.account.dto.UserDTO;
import com.ten.net10.account.exception.ResourceNotFoundException;
import com.ten.net10.account.service.AccountService;

@RestController
@RequestMapping("/net10/v1/accounts")
public class AccountEndpoint {
	
	private static final Logger logger = Logger.getLogger(AccountEndpoint.class);
    
	private AccountService accountService;

    @Autowired
    public AccountEndpoint(AccountService accountService) {
        this.accountService = accountService;
    }
    
//    Set up a new account
    @Secured({"ROLE_ADMIN", "ROLE_MANAGER","ROLE_RECRUITER"})
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> setup(@Valid @RequestBody UserDTO userDTO)throws Exception{
    	accountService.setup(userDTO);
        logger.info("A new account has been set up");
        
//        Http Response Headers can be included in Response Entity
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }    
    @Secured({"ROLE_MANAGER","ROLE_RECRUITER"})
    @RequestMapping(value="/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> findById(@PathVariable String id)throws Exception{  
    	logger.info("Fetching a user ...");
    	UserDTO userDTO = accountService.findById(id);
    	
    	if (userDTO == null) {        	
        	ResourceNotFoundException rnfe = new ResourceNotFoundException("User can not be found");
        	logger.warn("User can not be found", rnfe);
        	throw rnfe;
        }
    	
    	return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @Secured({"ROLE_ADMIN", "ROLE_MANAGER","ROLE_RECRUITER"})
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> modify(@Valid @RequestBody UserDTO userDTO)throws Exception{
    	accountService.modify(userDTO);
    	logger.info("The account has been modified");
    	
    	return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    
//    This endpoint API is exposed to other microservices who wish to do authc/authz on a client request for their protected resources
    @RequestMapping(value="/credentials/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> findCredentialsByUsername(@PathVariable String username)throws Exception{
    	logger.info("Fetching a user by username");    	
    	UserDTO userDTO = accountService.findByUsername(username);
    	
    	if (userDTO == null) {        	
        	ResourceNotFoundException rnfe = new ResourceNotFoundException("User can not be found");
        	logger.warn("User can not be found", rnfe);
        	throw rnfe;
        }
    	
    	logger.info("User has been found by username");
    	return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
    
}
