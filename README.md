
# #Authentication
##GET TOKEN
>URL : https://localhost:*****/api/auth/login </br>
Method : POST </br>
BODY: </br>
{ </br>
&nbsp;&nbsp; "Email": "abc@gmail.com", </br>
&nbsp;&nbsp; "Password": "Abc@123" </br>
} </br>

# # ForgotPassword And ResetPassword 
##GET LINK CALLBACK SEND TO EMAIL TO RESETPASSWOD 
>URL : https://localhost:*****/api/auth/forgotpassword </br>
Method : POST <br/>
BODY: </br>
{ </br>
&nbsp;&nbsp; "Email": "abc@gmail.com" </br>
} </br>

##REQUEST CODE TO CONFIRM RESETPASSWORD </br>
>URL : https://localhost:*****/api/auth/getcoderesetpassword </br>
Method : POST </br>

##REQUEST RESET PASSWORD <br/>
>URL : https://localhost:*****/api/auth/resetpassword </br>
Method : POST </br>
BODY: </br>
{ </br>
&nbsp;&nbsp; "Email": "abc@gmail.com", </br>
&nbsp;&nbsp; "Password": "Abc@123", </br>
&nbsp;&nbsp; "ConfirmPassword" : "Abc@123", </br>
&nbsp;&nbsp; "Code" : "code-here" </br>
} </br>

# #Register And ConfirmEmail
##RegisterUser
>URL : https://localhost:*****/api/registeruser </br>
Method : POST </br>
BODY: </br>
{ </br>
&nbsp;&nbsp; "Email": "abc@gmail.com", </br>
&nbsp;&nbsp; "Password": "Abc@123" </br>
&nbsp;&nbsp; "ConfirmPassword": "Abc@123" </br>
} </br>
##Confirm Email
>URL : https://localhost:*****/api/confirmemail</br>
Method : POST </br>
BODY: </br>
{ </br>
&nbsp;&nbsp; "userid": "userid", </br>
&nbsp;&nbsp; "code": "code" </br>
} </br>

# #UserProfile

##GET USERPROFILE

>URL : https://localhost:*****/api/agent/getprofile</br>

Method : GET </br>

HEADER: </br>
{ </br>
&nbsp;&nbsp; "Authorization": "Bearer + TOKEN" </br>
} </br>

##GET LISTUSER
>URL : https://localhost:*****/api/agent/getagentlist </br>

HEADER: </br>
{ </br>
&nbsp;&nbsp; "Authorization": "Bearer + TOKEN" </br>
} </br>

##POST AVATAR
>URL : https://localhost:*****/api/agent/editprofile </br>

Method : POST </br>

HEADER: </br>
{ </br>
&nbsp;&nbsp; "Authorization": "Bearer + TOKEN", </br>
&nbsp;&nbsp; "Content-Type":"multipart/form-data" </br>
} </br>

BODY: </br> 
{ </br>
&nbsp;&nbsp;&nbsp;"key":"file", </br> 
&nbsp;&nbsp;&nbsp;&nbsp;"value":"image/*",</br> 
&nbsp;&nbsp;&nbsp;&nbsp;"type":image </br> 
} </br>

