const config = require("../config.json")

let sessions = [];


function registerSession(newGameSessionObject) {
    console.log(newGameSessionObject)

    let sessionObject = {
        hostusername: newGameSessionObject.hostusername,
        hostIP: newGameSessionObject.hostIP,
        worldID: newGameSessionObject.worldID,
        visbility: newGameSessionObject.visbility || "private",
        lastCheckin: Date.now()
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
    return sessions.filter((session) => (session.visbility == "public"));
}

function purgeOldSessions() {
    sessions = sessions.filter((session) => ((Date.now() - session.lastCheckin) > config.sessionKeepAliveTime * 1000));
}

function getSessionsForWorld(world) {
    return sessions.filter((session) => (session.world == world));
}



module.exports = { registerSession, getSessions, getSessionsForWorld }


