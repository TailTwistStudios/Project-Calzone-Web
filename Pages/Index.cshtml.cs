using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Project_Calzone_Web.Services;

namespace Project_Calzone_Web.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    private GameSessionService GameSessionService;
    public int sessionCount = -1;

    public IndexModel(
        ILogger<IndexModel> logger,
        GameSessionService gameSessionService)
    {
        _logger = logger;
        GameSessionService = gameSessionService;
    }

    public void OnGet()
    {
        sessionCount = GameSessionService.getSessionCount();
    }
}
