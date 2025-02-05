using Microsoft.AspNetCore.Mvc;
using OnlineTradingAppReact.Server.Data;
using OnlineTradingAppReact.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace OnlineTradingAppReact.Server.Controllers
{
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TransactionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("/transactions")]
        public async Task<ActionResult<ApiResponse<IEnumerable<Transaction>>>> GetTransactions()
        {
            var transactions = await _context.Transactions
                .Include(t => t.User)
                .Include(t => t.Share)
                .ToListAsync();
            return ApiResponse<IEnumerable<Transaction>>.SuccessResult(transactions);
        }
        
        [HttpGet("/transactions/{id}")]
        public async Task<ActionResult<ApiResponse<Transaction>>> GetTransaction(Guid id)
        {
            var transaction = await _context.Transactions
                .Include(t => t.User)
                .Include(t => t.Share)
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
            return ApiResponse<Transaction>.SuccessResult(transaction);
        }

        [HttpPost("/buy")]
        public async Task<ActionResult<ApiResponse<Transaction>>> Buy(Transaction transaction)
        {
            var share = await _context.Shares.FindAsync(transaction.ShareId);
            var user = await _context.Users
                .Include(x => x.Portfolio)
                .Where(x => x.Id == transaction.UserId)
                .FirstOrDefaultAsync();

            if (share == null)
            {
                return BadRequest(ApiResponse<Transaction>.ErrorResult("Invalid share or user"));
            }

            if (transaction.Quantity > share.Quantity)
            {
                return BadRequest(ApiResponse<Transaction>.ErrorResult("Insufficient shares available"));
            }

            if (transaction.Quantity * share.Price > user.Portfolio.Balance)
            {
                return BadRequest(ApiResponse<Transaction>.ErrorResult("Insufficient funds"));
            }

            transaction.Date = DateTime.Now;

            var portfolioShare = await _context.PortfolioShares
                .FirstOrDefaultAsync(x => x.PortfolioId == user.Portfolio.Id && x.ShareId == transaction.ShareId);

            if (portfolioShare == null)
            {
                portfolioShare = new PortfolioShare
                {
                    Quantity = transaction.Quantity,
                    ShareId = transaction.ShareId,
                    PortfolioId = user.Portfolio.Id
                };
                _context.PortfolioShares.Add(portfolioShare);
            }
            else
            {
                portfolioShare.Quantity += transaction.Quantity;
            }

            share.Quantity -= transaction.Quantity;
            user.Portfolio.Balance -= transaction.Quantity * share.Price;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return ApiResponse<Transaction>.SuccessResult(transaction, "Buy transaction completed successfully");
        }

        [HttpPost("/sell")]
        public async Task<ActionResult<ApiResponse<Transaction>>> Sell(Transaction transaction)
        {
            var share = await _context.Shares.FindAsync(transaction.ShareId);
            var user = await _context.Users
                .Include(x => x.Portfolio)
                .FirstOrDefaultAsync(x => x.Id == transaction.UserId);

            if (share == null || user == null)
            {
                return BadRequest(ApiResponse<Transaction>.ErrorResult("Invalid share or user"));
            }

            var portfolioShare = await _context.PortfolioShares
                .FirstOrDefaultAsync(x => x.PortfolioId == user.Portfolio.Id && x.ShareId == transaction.ShareId);

            if (portfolioShare == null || portfolioShare.Quantity < transaction.Quantity)
            {
                return BadRequest(ApiResponse<Transaction>.ErrorResult("Insufficient shares in portfolio"));
            }

            transaction.Date = DateTime.Now;

            portfolioShare.Quantity -= transaction.Quantity;
            share.Quantity += transaction.Quantity;
            user.Portfolio.Balance += transaction.Quantity * share.Price;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return ApiResponse<Transaction>.SuccessResult(transaction, "Sell transaction completed successfully");
        }
    }
}
