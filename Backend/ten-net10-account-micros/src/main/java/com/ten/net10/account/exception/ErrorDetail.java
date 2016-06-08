package com.ten.net10.account.exception;

import java.util.*;

public class ErrorDetail {
	
	private String title;
	private int status;
	private String detail;
	private long timeStamp;
	private String exceptionClass;
	private Map<String, List<ValidationError>> validationErrors = new HashMap<String, List<ValidationError>>();
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public long getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(long timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getExceptionClass() {
		return exceptionClass;
	}
	public void setExceptionClass(String exceptionClass) {
		this.exceptionClass = exceptionClass;
	}
	public Map<String, List<ValidationError>> getValidationErrors() {
		return validationErrors;
	}
	public void setValidationErrors(Map<String, List<ValidationError>> validationErrors) {
		this.validationErrors = validationErrors;
	}
	

}
