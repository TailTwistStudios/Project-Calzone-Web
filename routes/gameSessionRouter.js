const config = require('./../config.json')
const express = require('express');
const router = express.Router();
const gameSession = require('../lib/gameSession');

//game sessions
router.get("/sessions", function(req,res) {
    res.send(gameSession.getSessions());
});
router.post("/registersession", function(req,res) {
    if (req.body) {
        if (config.debugLogRequests) console.log("registersession " + req.query);

        let response = gameSession.registerSession({
            hostusername: req.body.hostusername,
            hostIPv4: req.body.hostIPv4,
            worldID: req.body.worldID,
            visibility: req.body.visibility,
        });

        if (response.success) {
            res.status(202); //created   
        } else {
            res.status(400); //bad request
        }
        res.json(response);
    } else {
        res.status(400); //bad request
        //res.send~("400");
    }
});
router.post("/checkinsession", function(req,res) {
    if (req.body) {
        if (config.debugLogRequests) console.log("checkinsession " + req.query);

        let response = gameSession.checkInSession({
            sessionID: req.body.sessionID,
            sessionOwnerKey: req.body.sessionOwnerKey
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
    if (req.body) {
        let response = gameSession.closeSession({
            sessionID: req.body.sessionID,
            sessionOwnerKey: req.body.sessionOwnerKey,
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