using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineTradingAppReact.Server.Data;
using OnlineTradingAppReact.Server.Models;

namespace OnlineTradingAppReact.Server.Controllers
{
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PortfolioController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("/portfolios")]
        public async Task<ActionResult<ApiResponse<IEnumerable<Portfolio>>>> GetPortfolios()
        {
            var portfolios = await _context.Portfolios
                .Include(p => p.User)
                .Include(p => p.PortfolioShares)
                    .ThenInclude(ps => ps.Share)
                .ToListAsync();
            return ApiResponse<IEnumerable<Portfolio>>.SuccessResult(portfolios);
        }

        [HttpGet("/portfolios/{id}")]
        public async Task<ActionResult<ApiResponse<Portfolio>>> GetPortfolio(Guid id)
        {
            var portfolio = await _context.Portfolios
                .Include(p => p.User)
                .Include(p => p.PortfolioShares)
                    .ThenInclude(ps => ps.Share)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (portfolio == null)
            {
                return NotFound(ApiResponse<Portfolio>.ErrorResult("Portfolio not found"));
            }

            return ApiResponse<Portfolio>.SuccessResult(portfolio);
        }

        [HttpPost("/portfolios")]
        public async Task<ActionResult<ApiResponse<Portfolio>>> CreatePortfolio(Portfolio portfolio)
        {
            _context.Portfolios.Add(portfolio);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPortfolio), new { id = portfolio.Id },
                ApiResponse<Portfolio>.SuccessResult(portfolio, "Portfolio created successfully"));
        }

        [HttpPut("/portfolios/{id}")]
        public async Task<ActionResult<ApiResponse<Portfolio>>> UpdatePortfolio(Guid id, Portfolio portfolio)
        {
            if (id != portfolio.Id)
            {
                return BadRequest(ApiResponse<Portfolio>.ErrorResult("Invalid portfolio ID"));
            }

            _context.Entry(portfolio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Portfolios.Any(e => e.Id == id))
                {
                    return NotFound(ApiResponse<Portfolio>.ErrorResult("Portfolio not found"));
                }
                throw;
            }

            return ApiResponse<Portfolio>.SuccessResult(portfolio, "Portfolio updated successfully");
        }

        [HttpDelete("/portfolios/{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeletePortfolio(Guid id)
        {
            var portfolio = await _context.Portfolios.FindAsync(id);
            if (portfolio == null)
            {
                return NotFound(ApiResponse<bool>.ErrorResult("Portfolio not found"));
            }

            _context.Portfolios.Remove(portfolio);
            await _context.SaveChangesAsync();

            return ApiResponse<bool>.SuccessResult(true, "Portfolio deleted successfully");
        }
    }
}
