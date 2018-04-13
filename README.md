
# #Authentication
##GET TOKEN
>URL : https://localhost:*****/api/auth </br>
Method : POST </br>
BODY: </br>
{ </br>
&nbsp;&nbsp; "Email": "abc@gmail.com", </br>
&nbsp;&nbsp; "Password": "Abc@123" </br>
} </br>

# # ForgotPassword
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
