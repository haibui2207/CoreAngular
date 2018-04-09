# # ForgotPassword
##Step 1 <br/>
>URL : https://localhost:12345/api/auth/forgotpassword <br/>
Method : POST <br/>
BODY: <br/>
{ <br/>
	"Email": "abc@gmail.com" <br/>
} <br/>
RESPONSE : A Validate Code <br/>

##Step 2 <br/>
>URL : https://localhost:12345/api/auth/resetpassword <br/>
Method : POST <br/>
BODY: <br/>
{ <br/>
	"Email": "abc@gmail.com", <br/>
	"Password": "Abc@123", <br/>
	"ConfirmPassword" : "Abc@123", <br/>
	"Code" : "code-here" <br/>
} <br/>
 
>##Step 3 : Check get token with new password <br/>
URL : https://localhost:12345/api/auth <br/>
Method : POST <br/>
BODY: <br/>
{ <br/>
	"Email": "abc@gmail.com", <br/>
	"Password": "Abc@123" <br/>
} <br/>