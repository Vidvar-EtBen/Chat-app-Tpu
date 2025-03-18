using Chat_app.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Chat_app.Class;

namespace Chat_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserRepository UserRepository = new UserRepository();

        [HttpPost("LoginUser")]
        public IActionResult Login([FromBody] User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return BadRequest("Invalid username or password.");
            }

            bool loginSuccessful = UserRepository.Login(user);

            if (loginSuccessful)
            {

                return Ok(new
                {
                    Message = "Login successful!",
                    id = user.Id,
                });
            }
            else
            {
                return Unauthorized(new { Message = "Invalid username or password." });
            }
        }
    }
}
