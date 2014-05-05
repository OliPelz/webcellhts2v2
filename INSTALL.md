Installing web cellHTS2v2 is easy.
There are only a few files you need to change/configure.

First clone the project in a local directory
```sh
mkdir ~/somewhereovertherainbow;cd $__
git clone 
```

One has to decide what type and where you want to install web cellHTS2.
Open:
```sh
client/js/config.js
````

value my.testing should be true 
```sh
my.testing = true;
```
if we want to install web cellHTS2 locally without doing any R server nor calculations. This is the default option for testing the web application OR
if one wants to generate R scripts using a modern web interface for cellHTS2 to run later or on the R commandline.

if the value my.testing is false
```sh
my.testing = false;
```
web cellHTS2 will rely on an R server, so the next configuration variable 
```sh
my.webserver = "NODE.JS"; 
```
will be considered and defines the type of web server to run R-scripts on. Possible values are:
* NODE.JS - this is the default option if one will run cellHTS2 analysis on a local computer without relying on any webserver other than the local one (localhost). This feature also enables progressbar display while calculating anaysis results
* JAVA - this is for running your web cellHTS2 analysis on a webserver in the WWW. This should be the default option for running huge genome-wide analysis on a dedicated web cellHTS2 configured R-server. We use this option for our own web-cellHTS2 webserver but you can easily install your own in your own facility. The webserver will be defined as a grails web application using queueing technologies.

if you set my.testing to false and have a my.webserver defined, the program will also read the corresponding
```sh
	my.serverConnect = {
		"NODE.JS" : {
   	 		address : "127.0.0.1",
			...
```
which has information hash on how to connect to the corresponding web server technology.