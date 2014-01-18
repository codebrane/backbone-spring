package com.codebrane.domain;

/**
 * Encapsulates information about a Blackboard Course
 */
public class Course {
  /** id is for use by the client and is the code */
  private String id;
  private String code;
  private String title;
  private String description;

  /**
   * Default constructor for JSON on the wire
   */
  public Course() {}

  /**
   * Constructor for easy loading
   *
   * @param code course code
   * @param title course title
   * @param description course description
   */
  public Course(String code, String title, String description) {
    this.id = code;
    this.code = code;
    this.title = title;
    this.description = description;
  }

  // getters
  public String getId() { return id; }
  public String getCode() { return code; }
  public String getTitle() { return title; }
  public String getDescription() { return description; }

  // setters
  public void setId(String id) { this.id = id; }
  public void setCode(String code) { this.code = code; }
  public void setTitle(String title) { this.title = title; }
  public void setDescription(String description) { this.description = description; }
}
