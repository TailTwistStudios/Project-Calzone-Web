using System.Text.Json;

namespace Project_Calzone_Web.lib.GameSessions
{
    public class SanitizedGameSession
    {
        public SanitizedGameSession(GameSession gameSession) {
            hostusername = gameSession.hostusername;
            worldID = gameSession.worldID;
            visibility = gameSession.visibility;
            timeCreated = gameSession.timeCreated;
            sessionID = gameSession.sessionID;
        }

        public string hostusername;
        public string worldID;
        public GameSession.sessionVisibility visibility;
        public long timeCreated;
        public string sessionID;


        public static List<SanitizedGameSession> sanitizeMultiple(List<GameSession> sessions)
        {
            List<SanitizedGameSession> sanitizedGameSession = new List<SanitizedGameSession>();
            foreach (GameSession session in sessions)
            {
                sanitizedGameSession.Add(new SanitizedGameSession(session));
            }

            return sanitizedGameSession;
        }

        public override string ToString() => JsonSerializer.Serialize(this);
    }
}
