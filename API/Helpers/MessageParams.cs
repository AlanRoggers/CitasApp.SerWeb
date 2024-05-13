using API.Helpers;

public class MessageParams : PaginationParams
{
    public string Username { get; set; }
    public string Containter { get; set; } = "unread";
}