using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
        public interface IUserRepository
        {
                Task<MemberDto> GetMemberAsync(string username);
                Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams);
                Task<AppUser> GetUserByIdAsync(int id);
                Task<AppUser> GetUserByUsernameAsync(string username);
                Task<IEnumerable<AppUser>> GetUsersAsync();
                Task<bool> SaveAllAsync();
                void Update(AppUser user);
        }
}