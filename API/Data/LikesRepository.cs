
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<UserLike> GetUserLikeAsync(int sourceId, int targetUserID)
        {
            return await _context.Likes.FindAsync(sourceId, targetUserID);
        }

        public async Task<PageList<LikeDto>> GetUserLikesAsync(LikesParams lp)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (lp.Predicate.ToLowerInvariant() == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == lp.UserId);
                users = likes.Select(like => like.TargetUser);
            }

            if (lp.Predicate.ToLowerInvariant() == "likedby")
            {
                likes = likes.Where(like => like.TargetUserId == lp.UserId);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDto
            {
                UserName = user.UserName,
                KnowAs = user.KnownAs,
                Age = user.DateofBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain).Url,
                City = user.City,
                Id = user.Id
            });

            return await PageList<LikeDto>.CreateAsync(likedUsers, lp.PageNumber, lp.PageSize);
        }

        public async Task<AppUser> GetUserWithLikesAsync(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUser)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}