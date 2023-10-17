using Microsoft.AspNetCore.Http;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Project_Calzone_Web.lib
{
    public class GameSessionManager
    {

        private Random rnd;

        public enum sessionVisibility { PUBLIC, PRIVATE };

        public GameSessionManager()
        {
            rnd = new Random();
        }

        void registerSession(string hostusername, string hostIPv4, string worldID, sessionVisibility visibility = sessionVisibility.PUBLIC)
        {
            //verify the data input
            let IPv4Regex = new RegExp(regexLibrary.IPv4);
            if (!IPv4Regex.test(newGameSessionObject.hostIPv4)) return { success: false,reason: "Invalid IP address"};


            GameSession session = new GameSession();

            session.lastCheckin = DateTime.now();
            session.timeCreated = DateTime.now();

            session.sessionID = generateNewSessionID();
            session.sessionOwnerKey = generateNewSessionOwnerKey();


            Debug.log("Storing the value of the new session has not been setup yet.");
           

        /*return {
            checkin: Date.now(),
            sessionID: sessionObject.sessionID,
            sessionOwnerKey: sessionObject.sessionOwnerKey,
            sessionKeepAliveTime: config.sessionKeepAliveTimeInSeconds,
            success: true
        };*/
    }

        bool checkInSession(string sessionID, string sessionOwnerKey)
        {
            GameSession targetSession = getSessionById(sessionID);


            if (targetSession == null) return false; // no entry 
            if (targetSession.sessionOwnerKey != sessionOwnerKey) return false; //invalid session owner key

            targetSession.lastCheckin = Date.now();

            return true;
        }


        bool closeSession(string sessionID, string sessionOwnerKey)
        {
            GameSession targetSession = getSessionByID(sessionID);

            if (targetSession == null) return false; // no entry 
            if (targetSession.sessionOwnerKey != session.sessionOwnerKey) return false; //invalid session owner key

            Debug.log()


        return true;
        }





        GameSession[] getSessions()
        {
            purgeOldSessions();
            let sanitizedSessions = sessions.map((session) => {
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
        function purgeOldSessions()
        {
            let filteredSessions = sessions.filter(isSessionInDate);
            sessions = filteredSessions
        }
        function isSessionInDate(session)
        {
            //determine if the session's last checkin was within the sessionKeepAliveInSeconds value
            let value = ((Date.now() - session.lastCheckin) / 1000) < config.sessionKeepAliveTimeInSeconds;
            return value;
        }

        function getSessionsForWorld(world)
        {
            return sessions.filter((session) => (session.world == world));
        }
        function getSessionByID(targetID)
        {
            return sessions.find((session) => session.sessionID == targetID);
        }
        function doesSessionIDExist(targetID)
        {
            let doesExist = getSessionByID(targetID);
            return doesExist != undefined;
        }



        public string generateNewSessionID()
        {
            let value = Math.floor(Math.random() * 10000000);
            if (doesSessionIDExist(value))
            {
                value = generateNewSessionID();
            }

            return value;
        }

        string generateNewSessionOwnerKey()
        {
            return (string)rnd.next(1, 9999999999);
        }





    }

    public struct GameSession
    {
        public string hostusername;
        public string hostIPv4;
        public string worldID;
        public GameSessionManager.sessionVisibility visibility;
        public long lastCheckin;
        public long timeCreated;
        public string sessionID;
        public string sessionOwnerKey;
    }
}
