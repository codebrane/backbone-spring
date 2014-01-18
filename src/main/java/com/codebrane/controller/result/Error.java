package com.codebrane.controller.result;

public class Error {
  private String code;
  private String message;

  public Error() {}

  public Error(String code, String message) {
    this.code = code;
    this.message = message;
  }

  // getters
  public String getCode() { return code; }
  public String getMessage() { return message; }

  // setters
  public void setCode(String code) { this.code = code; }
  public void setMessage(String message) { this.message = message; }
}
