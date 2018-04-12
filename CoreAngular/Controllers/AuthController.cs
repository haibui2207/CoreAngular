using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CoreAngular.Models;
using CoreAngular.Models.AccountViewModels;
using CoreAngular.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace CoreAngular.Controllers
{
    [Produces("application/json")]
    [Route("api/Auth")]
    [EnableCors("CorsPolicy")]
    public class AuthController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;
        private IConfiguration _config;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IEmailSender emailSender,
            ILogger<AccountController> logger,
            IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _logger = logger;
            _config = config;
        }
       
        // POST: api/Auth
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");

                    var user = await _userManager.FindByEmailAsync(model.Email);

                    var roles = await _userManager.GetRolesAsync(user);

                    var tokenString = BuildToken(model, roles[0]);
                    return Ok(new { token = tokenString,  roles = roles });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        private string BuildToken(LoginViewModel model, string role)
        {
            var secretkey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credential = new SigningCredentials(secretkey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Email, model.Email),
                new Claim(ClaimTypes.Role,role)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credential);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //Forgot pass word
        //Step1: send email to Route Forgot password to get a code validate
        //Step2: send email + password + passwordconfirm to get a new pass

        [HttpPost]
        [AllowAnonymous]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByEmailAsync(model.Email);
                    if (user == null )
                    {
                        return BadRequest("Email doesn't exist.Please try again");
                    }
                    //Send link to email
                    //var callbackUrl = new Uri("http://localhost:53893/reset-password/" + user.Id);
                    //await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                    //   $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");

                    return Ok("Please check your email to reset your password.");
                }

                return BadRequest("Model invalid. Please try again");
            }
            catch (Exception e)
            {
                return BadRequest("Model invalid. Please try again");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Consumes("application/json", "application/json-patch+json", "multipart/form-data")]
        [Route("GetCodeResetPassword")]
        public async Task<IActionResult> GetCodeResetPassword([FromBody] string userid)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userid);
                if (user == null)
                {
                    return BadRequest("User doesn't exist!");
                }
                var requestCode = await _userManager.GeneratePasswordResetTokenAsync(user);

                return Ok(new { email = user.Email , code = requestCode });
            }
            catch (Exception e)
            {
                return BadRequest("User doesn't exist!");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Model invalid. Please try again");
                }
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    return BadRequest("Email doesn't exist.Please try again");
                }
                var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
                if (result.Succeeded)
                {
                    return Ok("Reset password successed.");
                }

                return BadRequest("Model invalid. Please try again");
            }
            catch (Exception e)
            {
                return BadRequest("Model invalid. Please try again");
            }
        }

        [HttpPost]
        [Route("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterViewModel model)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var roleresult = await _userManager.AddToRoleAsync(user, "Agent");

                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //var callbackUrl = "http://localhost:53750/confirmEmail?id="+ user.Id+"&code="+code;
                    
                    var callbackUrl = Url.EmailConfirmationLink(user.Id, code, Request.Scheme);
                    string [] s = callbackUrl.Split('=');
                    var mycode = s[2];
                    var mycallbackUrl = "http://localhost:53750/confirmEmail?id=" + user.Id + "&code=" + mycode;
                    await _emailSender.SendEmailConfirmationAsync(model.Email, mycallbackUrl);
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return Ok("please, confirm your email");
                }
                else
                {
                    AddErrors(result);

                    return BadRequest(ModelState);
                }

            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }
        [HttpPost]
        [Route("confirmEmail")]
        public async Task<IActionResult> confirmEmail([FromBody] ConfirmEmailViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var user = await _userManager.FindByIdAsync(model.userid);
                if (user == null)
                {
                    throw new ApplicationException($"Unable to load user with ID '{model.userid}'.");
                }
                var result = await _userManager.ConfirmEmailAsync(user, model.code);
                if(result.Succeeded)
                {
                    return Ok("confirm email success");
                }
                else
                {
                    return BadRequest("confirm email error");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}