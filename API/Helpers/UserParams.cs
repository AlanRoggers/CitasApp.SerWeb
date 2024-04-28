public class UserParams
{
    public string CurrentUsername { get; set; }
    public string Gender { get; set; }
    public int MaxAge { get; set; } = 100;
    public int MinAge { get; set; } = 18;
    private const int MAXPAGESIZE = 50;
    public int PageNumber { get; set; } = 1;
    private int pageSize { get; set; } = 10;
    public string OrderBy { get; set; } = "lastActive";
    public int PageSize
    {
        get => pageSize;
        set => pageSize = value > MAXPAGESIZE ? MAXPAGESIZE : value;
    }
}