const config = require("./../config.json")
const regexLibrary = require("./regexLibrary")

let sessions = [];


function registerSession(newGameSessionObject) {

    //verify the data input
    let IPv4Regex = new RegExp(regexLibrary.IPv4);
    if (!IPv4Regex.test(newGameSessionObject.hostIPv4)) {
        return {
            success: false,
            reason: "Invalid IP address",
        };
    }

    let sessionObject = {
        hostusername: newGameSessionObject.hostusername,
        hostIPv4: newGameSessionObject.hostIPv4,
        worldID: newGameSessionObject.worldID,
        visbility: newGameSessionObject.visbility,
        
        lastCheckin: Date.now(),
        timeCreated: Date.now(),
        sessionID: generateNewSessionID(),
    }
    sessions.push(sessionObject);
    
    return {
        checkin: Date.now(),
        sessionID: sessionObject.sessionID,
        sessionKeepAliveTime: config.sessionKeepAliveTimeInSeconds,
        success: true
    };
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




function generateNewSessionID() {
    let value = Math.floor(Math.random()*10000000);
    if (doesSessionIDExist(value)) {
        value = generateNewSessionID();
    }

    return value;
}
function doesSessionIDExist(targetID) {
    let doesExist = sessions.find((session) => session.sessionID == targetID);
    return doesExist != undefined;
}


module.exports = { registerSession, getSessions, getSessionsForWorld, doesSessionIDExist }


