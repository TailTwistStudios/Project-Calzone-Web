using Microsoft.AspNetCore.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Project_Calzone_Web.lib.GameSessions
{
    public static class GameSessionManager
    {
        static private Random rnd = new Random();
        static private List<GameSession> sessions = new List<GameSession>();

        public enum sessionVisibility { PUBLIC, PRIVATE };

        public static void registerSession(string hostusername, string hostIPv4, string worldID, sessionVisibility visibility = sessionVisibility.PUBLIC)
        {
            //verify the data input
            Regex r = new Regex(RegexLibrary.IPv4);
            if (r.IsMatch(hostIPv4))
            {
                Debug.Print("IP address \"" + hostIPv4 + "\" does not match the regex");
                return;
            }


            GameSession session = new GameSession();

            session.lastCheckin = Time.now;
            session.timeCreated = Time.now;

            session.sessionID = generateNewSessionID();
            session.sessionOwnerKey = generateNewSessionOwnerKey();


            Debug.Print("Storing the value of the new session has not been setup yet.");


            /*return {
                
            };*/
        }

        public static bool checkInSession(string sessionID, string sessionOwnerKey)
        {
            GameSession targetSession = getSessionByID(sessionID);

            if (targetSession == null) return false; // no entry 
            if (targetSession.sessionOwnerKey != sessionOwnerKey) return false; //invalid session owner key

            targetSession.lastCheckin = Date.now();

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


        public static GameSession[] getSessions()
        {
            purgeOldSessions();
            let sanitizedSessions = sessions.map((session) =>
            {
                return {
                hostusername: session.hostusername,
            sessionID: session.sessionID,
            worldID: session.worldID,
            visbility: session.visbility,
            timeCreated: session.timeCreated,
            //lastCheckin: session.lastCheckin
        }
            });

            return sanitizedSessions;
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
