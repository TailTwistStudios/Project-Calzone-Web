using Microsoft.AspNetCore.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Project_Calzone_Web.lib;
using Project_Calzone_Web.lib.GameSessions;
using Project_Calzone_Web.Lib.GameSessions;

namespace Project_Calzone_Web.Services
{
    public class GameSessionService
    {
        static private Random rnd = new Random();
        static private List<GameSession> sessions = new List<GameSession>();
        public IWebHostEnvironment WebHostEnvironment { get; }


        public GameSessionService(IWebHostEnvironment webHostEnvironment)
        {
            WebHostEnvironment = webHostEnvironment;
        }


        public static SessionRegistrationReceipt registerSession(string hostusername, string hostIPv4, string worldID, GameSession.sessionVisibility visibility = GameSession.sessionVisibility.PUBLIC)
        {
            //verify the data input
            Regex r = new Regex(RegexLibrary.IPv4);
            if (r.IsMatch(hostIPv4))
            {
                Debug.Print("IP address \"" + hostIPv4 + "\" does not match the regex");
                return null;
            }

            GameSession session = new GameSession(hostusername,hostIPv4,worldID,visibility);
            sessions.Add(session);

            return new SessionRegistrationReceipt(session);
        }

        public static bool checkInSession(string sessionID, string sessionOwnerKey)
        {
            GameSession targetSession = getSessionByID(sessionID);

            if (targetSession == null) return false; // no entry 
            if (targetSession.sessionOwnerKey != sessionOwnerKey) return false; //invalid session owner key

            targetSession.lastCheckin = Time.now;

            return true;
        }


        public static bool closeSession(string sessionID, string sessionOwnerKey)
        {
            GameSession targetSession = getSessionByID(sessionID);

            if (targetSession == null) return false; // no entry 
            if (targetSession.sessionOwnerKey != sessionOwnerKey) return false; //invalid session owner key

            sessions.Remove(targetSession);

            return true;
        }


        public IEnumerable<SanitizedGameSession> getSessions()
        {
            purgeOldSessions();

            List<SanitizedGameSession> sanitizedSessions = SanitizedGameSession.sanitizeMultiple(sessions);

            return sanitizedSessions.ToArray();
        }
        public int getSessionCount()
        {
            return getSessions().Count();
        }


        //Session management helper functions
        public static void purgeOldSessions()
        {
            sessions = sessions.Where(session => !isSessionInDate(session)).ToList();
        }
        public static bool isSessionInDate(GameSession session)
        {
            //determine if the session's last checkin was within the sessionKeepAliveInSeconds value
            long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            return now - session.lastCheckin < 60;
        }

        /*void getSessionsForWorld(string )
        {
            return sessions.filter((session) => (session.world == world));
        }*/
        public static GameSession getSessionByID(string sessionID)
        {
            return sessions.Find(session => session.sessionID == sessionID);
        }
        public static bool doesSessionIDExist(string sessionID)
        {
            return getSessionByID != null;
        }


        public static string generateNewSessionID()
        {
            string value = "" + rnd.Next();
            if (doesSessionIDExist(value))
            {
                value = generateNewSessionID();
            }

            return value;
        }

        public static string generateNewSessionOwnerKey()
        {
            return "" + rnd.Next();
        }
    }
}
