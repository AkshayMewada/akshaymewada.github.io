---
layout: post
title: "Host Flask and Django Web Application wit windows IIS FastCGI"
date: 2020-05-16 14:01:00 +0000
medium_url: "https://akshaymewada.medium.com/host-flask-and-django-web-application-wit-windows-iis-fastcgi-df7c9f4669d"
excerpt: "Internet Information Services(IIS) is a software package tool for hosting websites. FastCGI FastCGI provides high-performance interfacing between the web server and CGI programs, which…"
tags: ["isis", "django", "flask", "fastcgi", "deployment"]
---

Originally published on [Medium](https://akshaymewada.medium.com/host-flask-and-django-web-application-wit-windows-iis-fastcgi-df7c9f4669d).

#### Internet Information Services(IIS) is a software package tool for hosting websites.

### FastCGI

*FastCGI provides high-performance interfacing between the web server and CGI programs, which allows the server to handle more requests.*

*To access the* ***FastCGI*** *module, enable* ***CGI****Feature.*

*In Windows 7,8,10*

1. *Open* ***Turn Windows features on or off.***
2. *Click on IIS -> World Wide Web -> Application Development Features-> CGI . This will on both* ***CGI*** *and* ***FastCGI****modules.*

![]({{ '/assets/images/posts/medium/f872117867d58f84.png' | relative_url }})

*IIS Window Add Website*

*In Windows Server*

1. *On the taskbar, click* ***Server Manager****.*
2. *In* ***Server Manager****, click the* ***Manage*** *menu, and then click* ***Add Roles and Features****.*
3. *In the* ***Add Roles and Features*** *wizard, click* ***Next****. Select the installation type and click* ***Next****. Select the destination server and click****Next****.*
4. *On the* ***Server Roles*** *page, expand* ***Web Server (IIS)****, expand* ***Web Server****, expand* ***Application Development****, and then select* ***CGI****. Click****Next****.*

*Let us configure wfastcgi to host python web apps using IIS FastCGI*.

```
pip install wfastcgi
```

*Enable the wfastcgi access by the below command.*

```
wfastcgj-enable
```

*This will provide you access to the script processor. for eg.*

```
c:\users\user\appdata\local\programs\python\python36\python.exe|c:\users\user\appdata\local\programs\python\python36\lib\site-packages\wfastcgi.pyFlask APP with FastCGI
```

#### Flask App With FastCGI

- Let’s create a module handler for the flask app using FastCGI.

![]({{ '/assets/images/posts/medium/81328f5541124d85.png' | relative_url }})

- *To avoid all manual process add below web.config to the flask app directory or you can*[*refer*](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/fastcgi/)

```
<configuration>  
  <system.webServer>  
    <handlers>  
      <add name="Python FastCGI"  
           path="*"  
           verb="*"  
           modules="FastCgiModule"          scriptProcessor="c:\users\user\appdata\local\programs\python\python36\python.exe|c:\users\user\appdata\local\programs\python\python36\lib\site-packages\wfastcgi.py"  
           resourceType="Unspecified"  
           requireAccess="Script" />  
    </handlers>  
  </system.webServer>
```

```
<appSettings>  
    <!-- Required settings -->  
    <add key="WSGI_HANDLER" value="run.app" />  
    <add key="PYTHONPATH" value="C:\flaskapi"/>  
  </appSettings>  
</configuration>
```

***Let us understand the web.config of FastCGI.***

1. *The handlers are the main component of FastCGI module mapping for the current website.*
2. *The* ***scriptProcessor*** *is the key to run your WSGI application. For eg. in the flask defined app is your WSGI application.*
3. *This handler will process your web application.*
4. *The appSettings is are get translated to the environment variable to run the application.*
5. *PYTONPATH is the physical path to your flaskapp.*
6. *WSGI\_HANLER is the WSGI app. As shown above web.config in flaskapp run.py is accessed as run.app so* ***scriptProcessor*** *can access it.*
7. *For more detailed configuration.* [*here*](https://pypi.org/project/wfastcgi/)

![]({{ '/assets/images/posts/medium/00dd48fb27b89e88.png' | relative_url }})

*flaskapp*

*In the configuration editor, you will find the below details*.

![]({{ '/assets/images/posts/medium/50dfe6195ecdbb4c.png' | relative_url }})

*If you didn’t found configuration or it is throwing an error of web.config. Please check the web.config file. To check it and troubleshoot it in detail the references are shown at the end of the post.*

*After successful configuration, If you run your web application at this point it will throw access denied error because the flaskapp application has no permission to access the folder.*

***Add Permission*** *to* ***Flask Application*** *and* ***Python folder*** *where your executable is present.*

1. *Open folder properties.*
2. *In Security click on Edit then click on Add*
3. *Enter object name as IIS AppPool\<yourappname>*
4. *Click on the check name if its present click ok and allow permissions you wanted to give then apply it.*
5. *This link will help you with permissions.* [*here*](https://stackoverflow.com/questions/14934006/iis-iusrs-and-iusr-permissions-in-iis8)*.*

***Run your application***

*Click on the website added in Sites. Go to manage website click on start to run your application.*

#### *Django App With FastCGI*

- *Add web.config file to the path of the Django application.*

```
<configuration>  
  <system.webServer>  
    <handlers>  
      <add name="Python FastCGI"  
           path="*"  
           verb="*"  
           modules="FastCgiModule"         scriptProcessor="C:\Python36\python.exe|C:\Python36\Lib\site-packages\wfastcgi.py"  
           resourceType="Unspecified"  
           requireAccess="Script" />  
    </handlers>  
  </system.webServer>
```

```
  <appSettings>  
    <!-- Required settings -->  
    <add key="WSGI_HANDLER" value="myweb.wsgi.application" />  
    <add key="PYTHONPATH" value="C:\MyWebApp" />
```

```
    <!-- Optional settings -->  
    <add key="WSGI_LOG" value="C:\Logs\my_app.log" />  
  </appSettings>  
</configuration>
```

- *Here the* ***WSGI\_HANDLER*** *value is the same as* ***WSGI\_APPLICATION*** *value defined in setting.py of Django application.*
- *Follow the same procedure of flask application with FastCGI to make the Django application running.*

#### References:

- [*https://docs.microsoft.com/en-us/iis/configuration/system.webserver/fastcgi/*](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/fastcgi/)
- [*https://docs.microsoft.com/en-us/visualstudio/python/configure-web-apps-for-iis-windows?view=vs-2019*](https://docs.microsoft.com/en-us/visualstudio/python/configure-web-apps-for-iis-windows?view=vs-2019)
- [*https://pypi.org/project/wfastcgi/*](https://pypi.org/project/wfastcgi/)
