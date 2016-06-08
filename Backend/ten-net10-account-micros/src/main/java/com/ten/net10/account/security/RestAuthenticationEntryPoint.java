package com.ten.net10.account.security;

import java.io.IOException;
 
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
 
/**
 * This entry point is called once the request missing their authentication.
 * 
 * 
 * 
 */
@Component( "restAuthenticationEntryPoint" )
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
 
	private static final Logger logger = Logger.getLogger(RestAuthenticationEntryPoint.class);
	
    @Override
    public void commence(HttpServletRequest arg0, HttpServletResponse arg1,
            AuthenticationException arg2) throws IOException, ServletException {
    	
    	logger.error("Unauthorized");
        arg1.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
 
    }
 
}
