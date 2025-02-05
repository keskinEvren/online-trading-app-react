using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTradingAppReact.Server.Data;
using OnlineTradingAppReact.Server.Models;

namespace OnlineTradingAppReact.Server.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("/users")]
        public async Task<ActionResult<ApiResponse<IEnumerable<User>>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return ApiResponse<IEnumerable<User>>.SuccessResult(users);
        }

        [HttpGet("/users/{id}")]
        public async Task<ActionResult<ApiResponse<User>>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound(ApiResponse<User>.ErrorResult("User not found"));
            }

            return ApiResponse<User>.SuccessResult(user);
        }
        
        [HttpPost("/users")]
        public async Task<ActionResult<ApiResponse<User>>> CreateUser(User request)
        {
            var user = new User()
            {
                FirstName = request.FirstName,
                Email = request.Email,
                LastName = request.LastName,
                Id = Guid.NewGuid(),
            };
            _context.Users.Add(user);
            _context.Portfolios.Add(new Portfolio()
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                Balance = 0,
            });
            await _context.SaveChangesAsync();

            var response = new User()
            {
                Id = user.Id,
                Email = user.Email,
                LastName = user.LastName,
                FirstName = user.FirstName,
            };
            return ApiResponse<User>.SuccessResult(response);
        }
    }

}