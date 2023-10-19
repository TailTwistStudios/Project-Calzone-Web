using Project_Calzone_Web.Services;
using System.Security.Cryptography;
using System.Text.Json;

namespace Project_Calzone_Web.lib.GameSessions
{


    public class GameSession
    {
        public static Random rng = new Random();

        public string hostusername;
        public string hostIPv4;
        public string worldID;
        public enum sessionVisibility { PUBLIC, PRIVATE }
        public sessionVisibility visibility;
        public long lastCheckin;
        public long timeCreated;
        public string sessionID;
        public string sessionOwnerKey;

        public GameSession(string hostusername, string hostIPv4, string worldID, sessionVisibility visibility)
        {
            this.hostusername = hostusername;
            this.hostIPv4 = hostIPv4;
            this.worldID = worldID;
            this.visibility = visibility;

            lastCheckin = Time.now;
            timeCreated = Time.now;

            sessionID = GameSessionService.generateNewSessionID();
            sessionOwnerKey = GameSessionService.generateNewSessionOwnerKey();
        }

        //It's a bad idea to allow this one to be exported to JSON, as it contains sensitive information.
    }
}
