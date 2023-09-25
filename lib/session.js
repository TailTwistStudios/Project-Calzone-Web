const config = require("../config.json")

let sessions = [];


function registerSession(hostusername, hostIP, world, visibility) {
    let sessionObject = {
        hostusername: hostusername,
        hostIP: hostIP,
        world: world,
        visbility: visibility,
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


