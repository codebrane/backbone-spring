package com.codebrane.controller;

import com.codebrane.controller.result.*;
import com.codebrane.controller.result.Error;
import com.codebrane.domain.Course;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WSController {
  private static final Logger logger = Logger.getLogger(WSController.class);

  private List<Course> testCourses;

  public void init() {
    logger.info("init");
    testCourses = new ArrayList<Course>();
    testCourses.add(new Course("CRS1", "Cake Baking", "How to bake cakes"));
    testCourses.add(new Course("CRS2", "Bread Baking", "How to bake bread"));
    testCourses.add(new Course("CRS3", "Scone Baking", "How to bake scones"));
  }

  @RequestMapping(value = "/courses", method = RequestMethod.GET)
  public ModelAndView getCourses() {
    logger.info("courses");
    try {Thread.sleep(2000);}catch (InterruptedException ie){}
    ModelAndView mav = new ModelAndView("json/courses");
    mav.getModel().put("courses", testCourses);
    return mav;
  }

  @RequestMapping(value = "/course/{id}", method = RequestMethod.GET)
  public ModelAndView getCourse(@PathVariable String id) {
    logger.info("course:get");
    try {Thread.sleep(2000);}catch (InterruptedException ie){}
    ModelAndView mav = null;
    for (Course testCourse : testCourses) {
      if (testCourse.getId().equalsIgnoreCase(id)) {
        mav = new ModelAndView("json/course");
        mav.getModel().put("course", testCourse);
        break;
      }
    }
    if (mav == null) {
      mav = new ModelAndView("json/status");
      mav.getModel().put("status", "error");
      mav.getModel().put("error", new Error("100", "Course " + id + " does not exist"));
    }
    return mav;
  }

  // course code comes in as {id}
  @RequestMapping(value = "/course/{id}", method = RequestMethod.PUT)
  public ModelAndView updateCourse(@PathVariable String id, @RequestBody String jsonData) {
    logger.info("course:update");
    ModelAndView mav = null;
    JSONObject jsonObject = JSONObject.fromObject(jsonData);
    Course mxCourse = (Course)JSONObject.toBean(jsonObject, Course.class);
    for (Course testCourse : testCourses) {
      if (testCourse.getId().equalsIgnoreCase(id)) {
        testCourse.setTitle(mxCourse.getTitle());
        testCourse.setDescription(mxCourse.getDescription());
        mav = new ModelAndView("json/course");
        mav.getModel().put("course", testCourse);
        break;
      }
    }
    if (mav == null) {
      mav = new ModelAndView("json/error");
      mav.getModel().put("error", "course " + id + " does not exist");
    }
    return mav;
  }

  @RequestMapping(value = "/course/{id}", method = RequestMethod.DELETE)
  public ModelAndView deleteCourse(@PathVariable String id) {
    ModelAndView mav = null;
    logger.info("course:delete");
    for (Course testCourse : testCourses) {
      if (testCourse.getId().equalsIgnoreCase(id)) {
        testCourses.remove(testCourse);
        mav = new ModelAndView("json/delete");
        mav.getModel().put("contactID", id);
        break;
      }
    }
    if (mav == null) {
      mav = new ModelAndView("json/error");
      mav.getModel().put("error", "course " + id + " does not exist");
    }
    return mav;
  }

  // course code comes in as jsonData.code and no id
  @RequestMapping(value = "/course", method = RequestMethod.POST)
  public ModelAndView createNewCourse(@RequestBody String jsonData) {
    logger.info("course:create");
    ModelAndView mav = null;
    JSONObject jsonObject = JSONObject.fromObject(jsonData);
    Course mxCourse = (Course)JSONObject.toBean(jsonObject, Course.class);
    mxCourse.setId(mxCourse.getCode());
    testCourses.add(mxCourse);
    mav = new ModelAndView("json/course");
    mav.getModel().put("course", mxCourse);
    if (mav == null) {
      mav = new ModelAndView("json/error");
      mav.getModel().put("error", "could not create course " + mxCourse.getId());
    }
    return mav;
  }
}
