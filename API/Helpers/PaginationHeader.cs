namespace API.Helpers;

public class PaginationHeader(int currentPage, int itemsPerPage, int toalItems, int totalPages)
{
  public int CurrentPage { get; set; } = currentPage;
  public int ItemsPerPage { get; set; } = itemsPerPage;
  public int ToalItems { get; set; } = toalItems;
  public int TotalPages { get; set; } = totalPages;
}
