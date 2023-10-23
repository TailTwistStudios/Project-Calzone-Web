using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Calzone_Web.lib.GameSessions;
using Project_Calzone_Web.Services;
using System.Diagnostics;

namespace Project_Calzone_Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GameSessionsController : ControllerBase
    {
        public GameSessionService gameSessionService { get; }

        public GameSessionsController(GameSessionService gameSessionService)
        {
            this.gameSessionService = gameSessionService;
        }

        [HttpGet("/sessions")]
        public IEnumerable<SanitizedGameSession> GetSessions()
        {
            return gameSessionService.getSessions();
        }

        [HttpGet("/registersession")]
        //[FromBody]
        public ActionResult RegisterSession(
            [FromQuery] string hostusername, 
            [FromQuery] string ?hostIPv4, 
            [FromQuery] string ?worldID, 
            [FromQuery] GameSession.sessionVisibility ?visibility = GameSession.sessionVisibility.PUBLIC)
        {
            Debug.Write(hostusername);
            Console.WriteLine(hostusername);

            return Ok();
        }
    }
}
