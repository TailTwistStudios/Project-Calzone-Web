const config = require('./../config.json')
const express = require('express');
const router = express.Router();
const gameSession = require('../lib/gameSession');

//game sessions
router.get("/sessions", function(req,res) {
    res.send(gameSession.getSessions());
});
router.post("/registersession", function(req,res) {
    console.log(req)
    if (req.query) {
        if (config.debugLogRequests) console.log("registersession " + req.query);

        let response = gameSession.registerSession({
            hostusername: req.query.hostusername,
            hostIPv4: req.query.hostIPv4,
            worldID: req.query.worldID,
            visibility: req.query.visibility,
        });

        if (response.success) {
            res.status(202); //created   
        } else {
            res.status(400); //bad request
        }
        res.json(response);
    } else {
        res.status(400); //bad request
        //res.send("400");
    }
});
router.post("/checkinsession", function(req,res) {
    console.log(req.body)
    if (req.query) {
        if (config.debugLogRequests) console.log("checkinsession " + req.query);

        let response = gameSession.checkInSession({
            sessionID: req.query.sessionID,
            sessionOwnerKey: req.query.sessionOwnerKey
        });

        if (response.success) {
            res.status(200); //created
        } else {
            res.status(400); //bad request
        }
        res.json(response);
    }
    else {
        res.status(400); // bad request
    }
});
router.post("/closesession", function(req,res) {
    if (req.query) {
        let response = gameSession.closeSession({
            sessionID: req.query.sessionID,
            sessionOwnerKey: req.query.sessionOwnerKey,
        });

        if (response.success) {
            res.status(200); //created
        } else {
            res.status(400); //bad request
        }
        res.json(response);
    }
    else {
        res.status(400); //bad request
    }
});

module.exports = { router };