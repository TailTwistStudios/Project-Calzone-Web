using Project_Calzone_Web.lib;
using Project_Calzone_Web.lib.GameSessions;
using System.Text.Json;

namespace Project_Calzone_Web.Lib.GameSessions
{
    public class SessionRegistrationReceipt
    {
        public SessionRegistrationReceipt(GameSession session)
        {
            checkInTime = session.lastCheckin;
            sessionID = session.sessionID;
            sessionOwnerKey = session.sessionOwnerKey;
        }

        long checkInTime;
        string sessionID;
        string sessionOwnerKey;

        public override string ToString() => JsonSerializer.Serialize<SessionRegistrationReceipt>(this);
    }
}
