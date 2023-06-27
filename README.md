# MyChat


![vid0](https://github.com/samsorrahman/my_online_meeting_application/assets/112087807/a49d6fbd-c131-4e74-ac4c-044b27b8414e)
<br>
<br>
Run it Now!
https://murmuring-lowlands-84379-8081dbd8a026.herokuapp.com/

## Description 
A Group video calling application using the Agora Web SDK with a Django backend.

##  How to use this source code

#### 1 - Clone repo
```
https://github.com/samsorrahman/my_online_meeting_application.git
```

#### 2 - Install requirements
```

pip install -r requirements.txt
```

#### 3 - Update Agora credentals
In order to use this project you will need to replace the agora credentials in `views.py` and `streams.js`.

Create an account at agora.io and create an `app`. Once you create your app, you will want to copy the `appid` & `appCertificate` to update `views.py` and `streams.js`. If you have questions about where to get your app I'd recommend referencing this link `https://youtu.be/HX6AM_1-jNM?t=88`

###### views.py
```
def getToken(request):
    appId = "YOUR APP ID"
    appCertificate = "YOUR APPS CERTIFICATE"
    ......
```

###### streams.js
```
....
const APP_ID = 'YOUR APP ID'
....
```


#### 4 - Start server
```
python manage.py runserver
```



