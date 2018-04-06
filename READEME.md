# # ForgotPassword
##Step 1
URL : https://localhost:12345/api/auth/forgotpassword
Method : POST
BODY:
{
	"Email": "abc@gmail.com"
}
RESPONSE : A Validate Code

##Step 2
URL : https://localhost:12345/api/auth/resetpassword
Method : POST
BODY:
{
	"Email": "abc@gmail.com",
	"Password": "Abc@123",
	"ConfirmPassword" : "Abc@123",
	"Code" : "code-here"
}

##Step 3 : Check get token with new password
URL : https://localhost:12345/api/auth
Method : POST
BODY:
{
	"Email": "abc@gmail.com",
	"Password": "Abc@123"
}