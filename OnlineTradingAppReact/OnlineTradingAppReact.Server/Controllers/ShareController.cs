using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTradingAppReact.Server.Data;
using OnlineTradingAppReact.Server.Models;

namespace OnlineTradingAppReact.Server.Controllers
{
    [ApiController]
    public class ShareController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ShareController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("/shares")]
        public async Task<ActionResult<ApiResponse<IEnumerable<Share>>>> GetShares()
        {
            var shares = await _context.Shares.ToListAsync();
            return ApiResponse<IEnumerable<Share>>.SuccessResult(shares);
        }

        [HttpGet("/shares/{id}")]
        public async Task<ActionResult<ApiResponse<Share>>> GetShare(Guid id)
        {
            var share = await _context.Shares.FindAsync(id);
            if (share == null)
            {
                return NotFound(ApiResponse<Share>.ErrorResult("Share not found"));
            }
            return ApiResponse<Share>.SuccessResult(share);
        }

        [HttpPost("/shares")]
        public async Task<ActionResult<ApiResponse<Share>>> CreateShare(Share share)
        {
            var existingShare = await _context.Shares.FirstOrDefaultAsync(x => x.Symbol == share.Symbol);
            if (existingShare != null)
            {
                return BadRequest(ApiResponse<Share>.ErrorResult("Share symbol already exists"));
            }

            _context.Shares.Add(share);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetShare), new { id = share.Id }, ApiResponse<Share>.SuccessResult(share, "Share created successfully"));
        }

        [HttpPut("/shares/{id}")]
        public async Task<ActionResult<ApiResponse<Share>>> UpdateShare(Guid id, Share share)
        {
            if (id != share.Id)
            {
                return BadRequest(ApiResponse<Share>.ErrorResult("Invalid share ID"));
            }

            _context.Entry(share).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Shares.Any(e => e.Id == id))
                {
                    return NotFound(ApiResponse<Share>.ErrorResult("Share not found"));
                }
                throw;
            }

            return ApiResponse<Share>.SuccessResult(share, "Share updated successfully");
        }

        [HttpDelete("/shares/{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteShare(Guid id)
        {
            var share = await _context.Shares.FindAsync(id);
            if (share == null)
            {
                return NotFound(ApiResponse<bool>.ErrorResult("Share not found"));
            }

            _context.Shares.Remove(share);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.SuccessResult(true, "Share deleted successfully");
        }
    }
}