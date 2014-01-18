Backbone Spring
===============
Backbone/Marionette application based on the book:

[Backone Marionette, A Gentle Introduction](https://leanpub.com/marionette-gentle-introduction)

by [David Sulc](http://davidsulc.com/)

It's the same application but with a different domain model, Courses instead of Contacts.
Also, the local storage chapter has been replaced by a Spring 4 web application for
testing model fetch and save functionality across the network.

Deploying
=========
Let's say you cloned to /Users/groovy/dev/backbone-spring

* cd /Users/groovy/dev/backbone-spring
* mvn clean install
* set the environment variable:
* export BACKBONE_SPRING_HOME=/Users/groovy/dev/backbone-spring

in the file config/log4j.properties, change the log file paths:

* log4j.appender.rootFile.File
* log4j.appender.appFile.File

drop target/backbone-spring-1.0.0-SNAPSHOT.war into your tomcat webapps dir. Start tomcat and point your browser to:  
http://localhost:8080/backbone-spring