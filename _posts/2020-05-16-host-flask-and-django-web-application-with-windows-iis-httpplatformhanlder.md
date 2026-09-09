---
layout: post
title: "Host Flask and Django Web Application with windows IIS HttpPlatformHanlder"
date: 2020-05-16 13:31:00 +0000
medium_url: "https://akshaymewada.medium.com/host-flask-and-django-web-application-with-windows-iis-httpplatformhanlder-83e831ce91bc"
excerpt: "Internet Information Services(IIS) is a software package tool for hosting websites. Microsoft has made web hosting simpler by providing Internet Information Services(IIS) Software on…"
tags: ["flask", "httpplatformhandler", "django", "deployment", "isis"]
---

Originally published on [Medium](https://akshaymewada.medium.com/host-flask-and-django-web-application-with-windows-iis-httpplatformhanlder-83e831ce91bc).

#### Internet Information Services(IIS) is a software package tool for hosting websites.

> Microsoft has made web hosting simpler by providing Internet Information Services(IIS) Software on Windows Server/System.

IIS provides many features for hosting web applications. Python web app can be hosted by two features ***Httpplatformhandler*** and ***FastCGI***.

In this post, we will host a Flask and Django web application using these two features.

![]({{ '/assets/images/posts/medium/ad95eb50e377181b.png' | relative_url }})
![]({{ '/assets/images/posts/medium/2f52553eca4eac1c.png' | relative_url }})

IIS Window and Add website

For ***Flask*** physical path is a path to ***app.py*** of your application.   
For ***Django*** physical path is a path to ***manage.py*** of your application.

Let's configure Handler Mapping for Website.

### Httpplatformhandler

***Httpplatoformhandler*** manages any process like(Java, Ruby, Python, etc.) that can listen on Port for HTTP requests.

Download and Install ***Httpplatformhandler*** on IIS using ***Windows Platform Installer*.** or [here](https://www.iis.net/downloads/microsoft/httpplatformhandler).

#### Flask APP with Httpplatformhandler

- Add web.config where your flask is defined.

```
<?xml version="1.0" encoding="UTF-8"?>  
<configuration>  
    <system.webServer>  
        <handlers>  
            <add name="httpplatformhandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" requireAccess="Script" />  
        </handlers>  
        <httpPlatform startupTimeLimit="10" startupRetryCount="10" stdoutLogEnabled="true" processPath="C:\Users\user\AppData\Local\Programs\Python\Python36\python.exe" arguments="app.py">  
            <environmentVariables>  
                <environmentVariable name="foo" value="bar"/>  
            </environmentVariables>  
        </httpPlatform>  
    </system.webServer>  
</configuration>
```

**Let us understand the web.config of *httpplatformhanlder*.**

1. **httpPlaform** is handling the Python process.
2. As mentioned **processPath** is a physical path to python executable.
3. Just like you provide python path in a windows environment variable. To access the python executable. Here you have to provide ***python.exe*** in **processPath**.
4. **arguments** are the same argument you pass running any python web application. For eg. python ***app.py -p 5005*** where app.py to port number all are arguments. In the above application, ***app.py*** is passed to run flask application.
5. For more configuration details [***here***](https://docs.microsoft.com/en-us/iis/extensions/httpplatformhandler/httpplatformhandler-configuration-reference)***.***

Check the handler is selected perfectly after above web.config is added to flaskapp folder.

![]({{ '/assets/images/posts/medium/00dd48fb27b89e88.png' | relative_url }})

flaskapp website

In the configuration editor, you will find the below details.

![]({{ '/assets/images/posts/medium/73ae94c45e6e93b6.png' | relative_url }})

check configuration

If you didn’t found configuration or it is throwing an error of web.config. Please check the web.config file. To check it and troubleshoot it in detail the references are shown at the end of the post.

After successful configuration, If you run your web application at this point it will throw access denied error because the flaskapp application has no permission to access the folder.

**Add Permission** to **Flask Application** and **Python folder** where your executable is present.

1. Open folder properties.
2. In Security click on Edit then click on Add
3. Enter object name as IIS AppPool\<yourappname>
4. Click on the check name if its present click ok and allow permissions you wanted to give then apply it.
5. This link will help you with permissions. [here](https://stackoverflow.com/questions/14934006/iis-iusrs-and-iusr-permissions-in-iis8).

**Run your application**

#### Django APP with Httpplatformhandler

- Add web.config where your Django app is defined.

```
<?xml version="1.0" encoding="UTF-8"?>  
<configuration>  
    <system.webServer>  
        <handlers>  
            <add name="httpplatformhandler" path="*" verb="*" modules="httpPlatformHandler" resourceType="Unspecified" requireAccess="Script" />  
        </handlers>  
        <httpPlatform startupTimeLimit="10" startupRetryCount="10" stdoutLogEnabled="true" processPath="C:\Users\user\AppData\Local\Programs\Python\Python36\python.exe" arguments="manage.py runserver">  
            <environmentVariables>  
                <environmentVariable name="foo" value="bar"/>  
            </environmentVariables>  
        </httpPlatform>  
    </system.webServer>  
</configuration>
```

**Let us understand the web.config of *httpplatformhanlder*.**

1. The **processPath** is the same as **python.exe** as explained in the flask app.
2. **arguments** are the same argument you pass running any python web application. For eg. python **manage.py runserver** where app.py to port number all are arguments. In the above application, ***manage.py runserver*** is passed to run flask application.
3. For more configuration [***here***](https://docs.microsoft.com/en-us/iis/extensions/httpplatformhandler/httpplatformhandler-configuration-reference)***.***

**Add Permission** to **Django Application** and **Python folder** where your executable is present.

**Run your application**

[The next section of the post is Host Flask and Django Web Application wit windows IIS FastCGI.](https://medium.com/@akshay.mewada7/host-flask-and-django-web-application-wit-windows-iis-fastcgi-df7c9f4669d)

### References:

- <https://docs.microsoft.com/en-us/iis/extensions/httpplatformhandler/httpplatformhandler-configuration-reference>
- <https://forums.iis.net/t/1232188.aspx?HttpPlatformHandler+Python+Flask+Tornado+>
