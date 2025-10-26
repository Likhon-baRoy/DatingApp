using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class FallbackController : Controller
  {
    public ActionResult Index()
    {
      var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser", "index.html");
      return PhysicalFile(path, "text/html");
    }
  }
}
