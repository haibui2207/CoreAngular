using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CoreAngular.Data;
using CoreAngular.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreAngular.Controllers
{
    [Route("api/[controller]")]
    public class AgentController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AgentController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            this._context = context;
            this._userManager = userManager;
        }
        // GET: api/<controller>
        [Route("getagentlist")]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAgentList()
        {
            var listAgent = await _userManager.GetUsersInRoleAsync("Agent");
            return Ok(listAgent);
        }

        [Route("getprofile")]
        [Authorize(Roles = "Agent")]
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
           
            var id = _userManager.GetUserId(User); // Get user id:
            //var a = User.Identity;
            var claim = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
            var user = await _userManager.FindByEmailAsync(claim);
            //var user = await _userManager.GetUserAsync();
            return Ok(user);
        }
        [HttpPost]
        [Route("editprofile")]
        [Consumes("application/json", "application/json-patch+json", "multipart/form-data")]
        [Authorize(Roles = "Agent,Admin")]
        public async Task<IActionResult> editProfile(IFormFile file)
        {
            if (file != null || file.Length != 0)
            {
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", file.FileName);

                using (var stream = new FileStream(path, FileMode.Append))
                {
                    await file.CopyToAsync(stream);
                }
            }

            //////////////////////////
            var emailOrUserId = User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress").Value;
            var user = await _userManager.FindByEmailAsync(emailOrUserId);
            if (user == null)
            {
                user = await _userManager.FindByIdAsync(emailOrUserId);
                if (user != null)
                {
                    if (file != null || file.Length != 0)
                        user.AvatarURL = "https://localhost:44342/Images/" + file.FileName;

                    var result = await _userManager.UpdateAsync(user);

                }
            }
            else
            {
                if (file != null || file.Length != 0)
                    user.AvatarURL = "https://localhost:44342/Images/" + file.FileName;
                var result = await _userManager.UpdateAsync(user);

            }
            return Ok();
        }

    }
}
