web cellHTS2 server Tutorial
================
web cellHTS2 server is a modern webserver for processing input files and running web cellHTS2 analysis.
This tutorial is for installing and configuring the web cellHTS2 server, this is the complete and FULL tutorial.
It is based on centos 6 linux server for the R server. The R server and web cellHTS2 server can be distangled on two seperate servers.
Technologies used
=================
 - Grails
 - Apache poi - HSSF for converting excel
 - JRI for running R
 - queueing system for java xxx

Prequisistes for R server
============
update to latest version of centos (we use a blank 6.5 for this tutorial)
install latest R package for Centos
```sh
yum update
su -c 'rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm'
sudo yum update
sudo yum install R
```

Complete tutorial
=================


Common configurations
=====================
1. install grails 2.3.5 using gvm
```sh
$ curl -s get.gvmtool.net | bash
$ gvm install grails 2.3.5
```
2. adjust JAVA_HOME environment path if needed
```sh
$ echo $JAVA_HOME
```
according to this [instruction](http://www.grails.org/Installation : instruction)
3. create application
```sh
$ mkdir ~/Workspace
$ cd ~/Workspace
$ grails create-app PollSys
```
4. set up an environment variable to refer to later and goto new application
```sh
export POLLSYS_HOME=~/Workspace/PollSys
$ cd $POLLSYS_HOME
```
5. created an new document which holds this tutorial
```sh
$ vi COMPLETE_TUTORIAL.md  # put in the content of this tutorial :)
```
6. integrate grails with git (creating a .gitignore file)
```sh
grails integrate-with  --git
```
7. link to our Git repository
(created a new repos called PollSystem on our remote git server before this step)
```sh
grails clean
rm -rf target
git init
git add *
git commit -m "My initial commit of the PollSys project"
git remote add origin git@b110-adminsrv:PollSystem.git
git push -u origin master
```
8. create project files for intellij IDE and/or Eclipse
```sh
grails integrate-with --eclipse --intellij --textmate
```
9. adjust gitignore file to exclude IDE project files 
```sh
vi .gitignore
#append following lines into that file
.classpath
.project
PollSys.iml
PollSys.ipr
PollSys.tmproj
git add .gitignore
```
9. install important plugins for the project
- link to an alternative spring maven repos in order we can use spring security release candidate
```sh
$ vi grails-app/conf/BuildConfig.groovy
# put in the following lines:
...
mavenRepo 'http://repo.spring.io/milestone'
...
…
plugins {
…
    compile ':spring-security-core:2.0-RC2'
…
}
...
grails.project.dependency.resolution = {
    …
    pom true
    repositories {
        …
        mavenLocal()    
    }
}
....
```
10. use maven pom's for configuring our built dependancies
```sh
grails create-pom de.dkfz.signaling
```
from now one we will use maven's pom.xml to manage project jar dependancies!

11. generate databases (production and development) with users/tables/permissions
```sh
$ mysql -u root -p
>CREATE DATABASE PollSys_DEV DEFAULT CHARACTER SET utf8 ;
>CREATE DATABASE PollSys DEFAULT CHARACTER SET utf8 ;
>GRANT ALL PRIVILEGES ON PollSys_DEV.* TO 'pollsys'@'localhost' IDENTIFIED BY 'pollsys';
>GRANT ALL PRIVILEGES ON PollSys.* TO 'pollsys'@'localhost' IDENTIFIED BY 'pollsys';
>flush privileges ;
```
12. setting up dbm changelogs to keep track of our database schema changes
```sh
grails dbm-generate-gorm-changelog changelog.groovy
```
13. from now on we are applying the gorm changelog mechanism to keep track of our schema changes therefore we have to disable the standard dbCreate mechanism of grails (which would otherwise interfer with our changelog because than grails would attemp to make changes everytime you run the application)
```sh
# set all lines containing 
# dbCreate
# in grails-app/conf/DataSource.groovy 
# to:
dataSource dbcreate='none'
```
everytime we make a schema change, we have to tell the gorm-changelog script to keep track off
To do so you need two commands (dont do this now)
everytime you make changes to the schema e.g. adding new domain classes to the project make a "diff" file to the original changelog to keep track of our changes
```sh
grails dbm-gorm-diff changelog.groovy -add
```
after the changelog has been updated with the latest changes, run the following command to sync the database schema with our changelog
```sh
grails dbm-update
```

14. connect application to mysql server database connection instead of h2
```sh
vi grails-app/conf/DataSource.groovy 
#change dataSource section to use mysql and our username/password
dataSource {
   …
    driverClassName = "com.mysql.jdbc.Driver"
    username = "pollsys"
    password = "pollsys"
}
#change every occurence of the "url" parameter of the jdbc string to use our mysql db instead of in-memory h2
//url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000;DB_CLOSE_ON_EXIT=FALSE"
url = "jdbc:mysql://127.0.0.1/PollSys_DEV?useUnicode=yes&characterEncoding=UTF-8"
# add mysql connector dependency in BuildConfig.groovy
```
15. add the mysql connector jar in order to make connections to mysql databases. Do this in the pom.xml
```java
<dependency>
    		<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.16</version>
</dependency>
```

Developing the project
======================

1. generate our two domain classes
```sh
grails create-domain-class de.dkfz.signaling.Answer
grails create-domain-class de.dkfz.signaling.Question
``` 
2. set up the domains, put in code
Answer.groovy

```java
package pollsys

class Answer {
    String answer
    int count
    String type

    static belongsTo = [question : Question]

    static constraints = {
        answer (blank: true)
        count (blank: false)
    }

    static mapping = {
        version false
    }
}
```

Question.java
```java
package pollsys

class Question {
    String question
    boolean isPublic
    Date startDate
    Date endDate
    String type
    int priority

    static hasMany = [answers: Answer]

    static constraints = {
        question (blank: false)
        type (blank: false)
        priority (blank: false)
    }

    static mapping = {
        version false
    }
}
```
3. Now before we can first run our new application since we don't have any Loginuser, Roles or Loginpages next step is to create all of that:

```sh
grails s2-quickstart de.dkfz.signaling SecUser SecRole
```
creates login domains and controllers for login and logout

4. Now update our dbm changelog and than our db schema
```sh
grails dbm-gorm-diff changelog.groovy -add
grails dbm-update
```
```

5. now we can start our application for the first time
```sh
grails run-app

```
as you see everything works fine and you can access the login controller.

5. next thing is to set up an admin user for logging in, in the database, on bootstrap level, open BootStrap.groovy and add

```java
def userRole 
    = SecRole.findByAuthority('ROLE_USER') ?: new SecRole(authority: 'ROLE_USER').save(failOnError: true)
def adminRole 
    = SecRole.findByAuthority('ROLE_ADMIN') ?: new SecRole(authority: 'ROLE_ADMIN').save(failOnError: true)
	        
def adminUser = SecUser.findByUsername('admin') ?: new SecUser(
	username: 'admin',
	password: 'admin',
	enabled: true).save(failOnError: true)

if (!adminUser.authorities.contains(adminRole)) {
    SecUserSecRole.create adminUser, adminRole
}
```
the "findByAuthority ... or ..." makes sure we don't add the users everytime we restart the application

6. now we add some dummy data for testing, the "findById .. or .." method makes sure we don't add the data everytime we restart the server

```java
    Answer answer1 = new Answer(
    	                answer: "Ja",
		                type: "string",
		                count: 0
		        )

		        Answer answer2 = new Answer(
		                answer: "Nein",
		                type: "string",
		                count: 0
		        )

		        Answer answer3 = new Answer(
		                answer: "Nuddeln",
		                type: "string",
		                count: 0
		        )

		        Answer answer4 = new Answer(
		                answer: "Maultaschen",
		                type: "string",
		                count: 0
		        )

		        Question question1 = Question.findById(1) ?: new Question(
		                isPublic: true,
		                type: "user",
		                priority: 1,
		                question: "Ist heute Montag?",
		                endDate: new Date(),
		                startDate: new Date()
		        ).addToAnswers(answer1)
		                .addToAnswers(answer2)
		                .save()

		        Question question2 = Question.findById(2) ?:  new Question(
		                isPublic: true,
		                type: "user",
		                priority: 1,
		                question: "Ist was gibt es heute zu Mittag?",
		                endDate: new Date(),
		                startDate: new Date()
		        ).addToAnswers(answer3)
		                .addToAnswers(answer4)
		                .save()
```
7. until later when we build our admin area now for testing we disable the complete security framework
```sh
#open grails-app/conf/Config.groovy
#replace the complete static rules with:
#
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
    '/**':               ['IS_AUTHENTICATED_ANONYMOUSLY']
]
```
7. add some controllers for RESTful services, put the following files in grails-app/controllers
These RESTful controllers are simple wrappers for our Answer and Question controller classes to extend them to REST features.

grails-app/controllers/de/dkfz/signaling/AnswerRestController.groovy:
```java
package de.dkfz.signaling

import grails.rest.RestfulController

    class AnswerRestController extends RestfulController {

    static responseFormats = ['json', 'xml']

    AnswerRestController() {
        super(Answer)
    }

    static allowedMethods = [get: "GET", save: "POST", update: "PUT", delete: "DELETE"]

    @Override
    def delete(){
        return null
    }
}
```
grails-app/controllers/de/dkfz/signaling/QuestionRestController.groovy:
```java
package de.dkfz.signaling

import grails.rest.RestfulController

    class AnswerRestController extends RestfulController {

    static responseFormats = ['json', 'xml']

    AnswerRestController() {
        super(Answer)
    }

    static allowedMethods = [get: "GET", save: "POST", update: "PUT", delete: "DELETE"]

    @Override
    def delete(){
        return null
    }
}
```

because we don't have generated the controllers using a grails script, we need to define our URL mappings on our own

```sh
#put in grails-app/conf/UrlMappings.groovy our new URLS for the rest controllers

"/question/rest"(resources: "questionRest")
"/answer/rest"(resources: "answerRest")
```

next generate a test for the rest





Sources
=======
http://keaplogik.blogspot.de/p/developing-grails-web-application.html#3-spring-security--apache-cxf-plugins

http://grails.org/plugin/database-migration

http://spring.io/blog/2010/08/11/simplified-spring-security-with-grails/

http://wpgreenway.com/posts/grails-db-migration-tutorial/

http://grails.org/doc/2.1.0/ref/Command%20Line/create-pom.html

http://stackoverflow.com/questions/19196442/dependencies-issue-with-spring-security-core-plugin

http://wpgreenway.com/posts/grails-db-migration-tutorial/

http://learnedstuffs.wordpress.com/2012/02/21/using-mysql-as-database-in-grails/


