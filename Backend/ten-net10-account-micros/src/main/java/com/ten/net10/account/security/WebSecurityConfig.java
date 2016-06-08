package com.ten.net10.account.security;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.context.*;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
// @EnableWebMVCSecurity
 @EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private static final Logger logger = Logger.getLogger(WebSecurityConfig.class);
	
	@Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
 
    @Autowired
    private MySavedRequestAwareAuthenticationSuccessHandler authenticationSuccessHandler;
    
    @Autowired
    private MyAuthenticationFailureHandler authenticationFailureHandler;

	@Autowired
	UserDetailsService userDetailsService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		logger.info("configure()");

		// http
		// .authorizeRequests()
		// .antMatchers("/", "/greeting").permitAll()
		// .anyRequest().authenticated()
		// .and()
		// .formLogin()
		// .loginPage("/login");

		// .permitAll()
		// .and()
		// .logout()
		// .permitAll();

//		http
//				// .sessionManagement()
//				// .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//				// .and()
//				.authorizeRequests()
//				// .antMatchers("/v1/**", "/v2/**", "/swagger-ui/**",
//				// "/api-docs/**").permitAll()
//				// .antMatchers("/v3/polls/ **").authenticated()
////				.antMatchers("/greeting").fullyAuthenticated()
//				.anyRequest().authenticated()
//				.and().httpBasic()
////				.exceptionHandling().authenticationEntryPoint(new RestAuthenticationEntryPoint())
//				.realmName("TET Realm")
//				.and().csrf()
//				.disable();
		
		http
        .csrf().disable()
        .exceptionHandling()
        .authenticationEntryPoint(restAuthenticationEntryPoint)
        .and()
        .authorizeRequests()
        .anyRequest().authenticated()
//        .and().httpBasic()
        .and().formLogin()
        .successHandler(authenticationSuccessHandler)
        .failureHandler(authenticationFailureHandler)
        .and()
        .logout();
		
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		logger.info("configureGlobal()");
		auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}
	
	@Bean
    public MySavedRequestAwareAuthenticationSuccessHandler mySuccessHandler(){
        return new MySavedRequestAwareAuthenticationSuccessHandler();
    }
    @Bean
    public MyAuthenticationFailureHandler myFailureHandler(){
    	return new MyAuthenticationFailureHandler();
    }
}
