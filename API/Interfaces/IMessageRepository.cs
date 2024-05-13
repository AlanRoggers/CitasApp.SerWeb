using System.Collections.Generic;
using API.DTOs;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessageAsync(int id);
        Task<PageList<MessageDto>> GetMessagesForUserAsync(MessageParams mp);
        Task<IEnumerable<MessageDto>> GetMessageThreadAsync(int currentUserId, int x);
        Task<bool> SaveAllAsync();
    }
}