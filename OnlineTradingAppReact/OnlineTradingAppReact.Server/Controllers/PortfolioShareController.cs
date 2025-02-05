using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTradingAppReact.Server.Data;
using OnlineTradingAppReact.Server.Models;

namespace OnlineTradingAppReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioShareController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PortfolioShareController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<PortfolioShare>>>> GetPortfolioShares()
        {
            var portfolioShares = await _context.PortfolioShares
                .Include(p => p.Portfolio)
                .Include(p => p.Share)
                .ToListAsync();
            return ApiResponse<IEnumerable<PortfolioShare>>.SuccessResult(portfolioShares);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<PortfolioShare>>> GetPortfolioShare(Guid id)
        {
            var portfolioShare = await _context.PortfolioShares
                .Include(p => p.Portfolio)
                .Include(p => p.Share)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (portfolioShare == null)
            {
                return NotFound(ApiResponse<PortfolioShare>.ErrorResult("PortfolioShare not found"));
            }

            return ApiResponse<PortfolioShare>.SuccessResult(portfolioShare);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<PortfolioShare>>> CreatePortfolioShare(PortfolioShare portfolioShare)
        {
            if (ModelState.IsValid)
            {
                _context.Add(portfolioShare);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPortfolioShare),
                    new { id = portfolioShare.Id },
                    ApiResponse<PortfolioShare>.SuccessResult(portfolioShare, "PortfolioShare created successfully"));
            }
            return BadRequest(ApiResponse<PortfolioShare>.ErrorResult("Invalid model state"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<PortfolioShare>>> UpdatePortfolioShare(Guid id, PortfolioShare portfolioShare)
        {
            if (id != portfolioShare.Id)
            {
                return BadRequest(ApiResponse<PortfolioShare>.ErrorResult("ID mismatch"));
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(portfolioShare);
                    await _context.SaveChangesAsync();
                    return ApiResponse<PortfolioShare>.SuccessResult(portfolioShare, "PortfolioShare updated successfully");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PortfolioShareExists(portfolioShare.Id))
                    {
                        return NotFound(ApiResponse<PortfolioShare>.ErrorResult("PortfolioShare not found"));
                    }
                    throw;
                }
            }
            return BadRequest(ApiResponse<PortfolioShare>.ErrorResult("Invalid model state"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeletePortfolioShare(Guid id)
        {
            var portfolioShare = await _context.PortfolioShares.FindAsync(id);
            if (portfolioShare == null)
            {
                return NotFound(ApiResponse<bool>.ErrorResult("PortfolioShare not found"));
            }

            _context.PortfolioShares.Remove(portfolioShare);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.SuccessResult(true, "PortfolioShare deleted successfully");
        }

        private bool PortfolioShareExists(Guid id)
        {
            return _context.PortfolioShares.Any(e => e.Id == id);
        }
    }
}
