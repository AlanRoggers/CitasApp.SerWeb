namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLikeAsync(int sourceId, int targetUserID);
        Task<AppUser> GetUserWithLikesAsync(int userId);
        Task<IEnumerable<LikeDto>> GetUserLikesAsync(string predicate, int userId);
    }
}