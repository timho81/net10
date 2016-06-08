package com.ten.net10.account.exception;

import java.util.*;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;



@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
	
	private static final Logger logger = Logger.getLogger(RestExceptionHandler.class);

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e, HttpServletRequest request) {
		logger.info("Resources can not be found", e);
		
		ErrorDetail errorDetail = new ErrorDetail();
		errorDetail.setTimeStamp(new Date().getTime());
		errorDetail.setStatus(HttpStatus.NOT_FOUND.value());
		errorDetail.setTitle("Resource Not Found");
		errorDetail.setDetail(e.getMessage());
		errorDetail.setExceptionClass(e.getClass().getName());
		return new ResponseEntity<>(errorDetail, null, HttpStatus.NOT_FOUND);
	}

//	@ExceptionHandler(MethodArgumentNotValidException.class)
//	public ResponseEntity<?> handleValidationError(MethodArgumentNotValidException e, HttpServletRequest request) {
//		ErrorDetail errorDetail = new ErrorDetail();
//
//		errorDetail.setTimeStamp(new Date().getTime());
//		errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());
//
////		String requestPath = (String) request.getAttribute("javax.servlet.error.request_uri");
//
////		if (requestPath == null) {
////			requestPath = request.getRequestURI();
////		}
//		errorDetail.setTitle("Validation Failed");
//		errorDetail.setDetail("Input validation failed");
//		errorDetail.setExceptionClass(e.getClass().getName());
//
//		// Create ValidationError instances
//		List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
//
//		for (FieldError fe : fieldErrors) {
//			List<ValidationError> validationErrorList = errorDetail.getValidationErrors().get(fe.getField());
//			if (validationErrorList == null) {
//				validationErrorList = new ArrayList<ValidationError>();
//				errorDetail.getValidationErrors().put(fe.getField(), validationErrorList);
//			}
//			ValidationError validationError = new ValidationError();
//			validationError.setCode(fe.getCode());
//			validationError.setMsg(fe.getDefaultMessage());
//			validationErrorList.add(validationError);
//		}
//
//		return new ResponseEntity<>(errorDetail, null, HttpStatus.BAD_REQUEST);
//	}

	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		logger.info("Http message is unreadable", ex);
		ErrorDetail errorDetail = new ErrorDetail();
		errorDetail.setTimeStamp(new Date().getTime());
		errorDetail.setStatus(status.value());
		errorDetail.setTitle("Message is unreadable");
		errorDetail.setDetail(ex.getMessage());
		errorDetail.setExceptionClass(ex.getClass().getName());
		return handleExceptionInternal(ex, errorDetail, headers, status, request);
	}

	@Override
	public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e, HttpHeaders headers,
			HttpStatus status, WebRequest request) {
		logger.info("Invalid Method Argument", e);
		ErrorDetail errorDetail = new ErrorDetail();

		errorDetail.setTimeStamp(new Date().getTime());
		errorDetail.setStatus(HttpStatus.BAD_REQUEST.value());

//		String requestPath = (String) request.getAttribute("javax.servlet.error.request_uri");

//		if (requestPath == null) {
//			requestPath = request.get.getRequestURI();
//		}
		errorDetail.setTitle("Validation Failed");
		errorDetail.setDetail("Input validation failed");
		errorDetail.setExceptionClass(e.getClass().getName());

		// Create ValidationError instances
		List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

		for (FieldError fe : fieldErrors) {
			List<ValidationError> validationErrorList = errorDetail.getValidationErrors().get(fe.getField());
			if (validationErrorList == null) {
				validationErrorList = new ArrayList<ValidationError>();
				errorDetail.getValidationErrors().put(fe.getField(), validationErrorList);
			}
			ValidationError validationError = new ValidationError();
			validationError.setCode(fe.getCode());
			validationError.setMsg(fe.getDefaultMessage());
			validationErrorList.add(validationError);
		}
		
		return handleExceptionInternal(e, errorDetail, headers, status, request);
	}

}
