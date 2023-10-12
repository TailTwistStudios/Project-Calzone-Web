const config = require("./../config.json")
const regexLibrary = require("./regexLibrary")

let sessions = [];


function registerSession(newGameSessionObject) {

    //verify the data input
    let IPv4Regex = new RegExp(regexLibrary.IPv4);
    if (!IPv4Regex.test(newGameSessionObject.hostIPv4)) return {success: false,reason: "Invalid IP address"};

    let sessionObject = {
        hostusername: newGameSessionObject.hostusername,
        hostIPv4: newGameSessionObject.hostIPv4,
        worldID: newGameSessionObject.worldID,
        visbility: newGameSessionObject.visbility,
        
        unproccessedJoinRequests: [],
        acceptedJoinRequests: [],

        lastCheckin: Date.now(),
        timeCreated: Date.now(),
        sessionID: generateNewSessionID(),
        sessionOwnerKey: generateNewSessionOwnerKey(), //this is not secure
    }
    sessions.push(sessionObject);
    
    return {
        checkin: Date.now(),
        sessionID: sessionObject.sessionID,
        sessionOwnerKey: sessionObject.sessionOwnerKey,
        sessionKeepAliveTime: config.sessionKeepAliveTimeInSeconds,
        success: true
    };
}
function checkInSession(session) {
    let targetSession = getSessionByID(session.sessionID);

    if (targetSession == undefined) return { success:false, reason: "Session does not exist"};
    if (targetSession.sessionOwnerKey != session.sessionOwnerKey) return {success:false,reason:"Invalid owner key"};
    
    targetSession.lastCheckin = Date.now();
    return { success: true };

}
//untested
function closeSession(session) {
    let targetSession = getSessionByID(session.sessionID);

    if (targetSession == undefined) return {success: false, reason: "Session does not exist"};
    if (targetSession.sessionOwnerKey != session.sessionOwnerKey) return {success:false, reason:"Invalid owner key"};

    let sessionIndex = sessions.indexOf(targetSession);
    sessions.splice(sessionIndex,1);
    return { success: true};
}





function getSessions() {
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
function getSessionByID(targetID) {
    return sessions.find((session) => session.sessionID == targetID);
}
function doesSessionIDExist(targetID) {
    let doesExist = getSessionByID(targetID);
    return doesExist != undefined;
}



function generateNewSessionID() {
    let value = Math.floor(Math.random()*10000000);
    if (doesSessionIDExist(value)) {
        value = generateNewSessionID();
    }

    return value;
}
function generateNewSessionOwnerKey() {
    let value = Math.floor(Math.random()*10000000);
    value = value.toString(36)

    return value;
}



module.exports = { registerSession, checkInSession, closeSession, getSessions, getSessionsForWorld, doesSessionIDExist }
