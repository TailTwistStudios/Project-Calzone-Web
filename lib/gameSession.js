const config = require("./../config.json")

let sessions = [];


function registerSession(newGameSessionObject) {
    console.log(newGameSessionObject)

    let sessionObject = {
        hostusername: newGameSessionObject.hostusername,
        hostIP: newGameSessionObject.hostIP,
        worldID: newGameSessionObject.worldID,
        visbility: newGameSessionObject.visbility,
        lastCheckin: Date.now(),
        timeCreated: Date.now()
    }
    sessions.push(sessionObject);
    
    let responseObject = {
        checkin: Date.now(),
        sessionKeepAliveTime: config.sessionKeepAliveTime
    }
    return responseObject;
}

function getSessions() {
    purgeOldSessions();
    let sanitizedSessions = sessions.map((session) => {
        return {
            hostusername: session.hostusername,
            worldID: session.worldID,
            visbility: session.visbility,
            timeCreated: session.timeCreated
        }
    });
    
    return sanitizedSessions;
}

function purgeOldSessions() {
    let filteredSessions = sessions.filter(isSessionInDate);
    sessions = filteredSessions
}
function isSessionInDate(session) {
    //determine if the session's last checkin was within the sessionKeepAliveInSeconds value
    let value = ((Date.now() - session.lastCheckin) / 1000) < config.sessionKeepAliveTimeInSeconds;
    return value;
}

function getSessionsForWorld(world) {
    return sessions.filter((session) => (session.world == world));
}



module.exports = { registerSession, getSessions, getSessionsForWorld }


