using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLikeAsync(int sourceId, int targetUserID);
        Task<AppUser> GetUserWithLikesAsync(int userId);
        Task<PageList<LikeDto>> GetUserLikesAsync(LikesParams likesParams);
    }
}