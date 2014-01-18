<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ page isELIgnored="false"%>

<c:set var="first" value="true" />

[
  <c:forEach var="course" items="${courses}">

  <c:if test="${!first}">,</c:if>
  <c:set var="first" value="false" />

  {
    "id": "${course.id}",
    "code": "${course.code}",
    "title": "${course.title}",
    "description": "${course.description}"
  }

  </c:forEach>
]