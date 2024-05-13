public class PaginationHeader
{
    public PaginationHeader(int currentPage, int itemPerPage, int totalItems, int totalPages)
    {
        CurrentPage = currentPage;
        ItemsPerPage = itemPerPage;
        TotalItems = totalItems;
        TotalPages = totalPages;
    }

    public int CurrentPage { get; set; }
    public int ItemsPerPage { get; private set; }
    public int TotalItems { get; private set; }
    public int TotalPages { get; private set; }
}