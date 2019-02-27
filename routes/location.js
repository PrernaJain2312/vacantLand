const route = require('express').Router();
const landBank = require('../db/models').landBank;
const request = require('request');


function recently_added(stateFetched) {
    return new Promise((resolve, reject) => {
        let recentlyAdded = {};
        if (stateFetched) {
            landBank.findAll({
                limit: 6,
                where: {
                    State: stateFetched,
                },
                order: [
                    ['createdAt', 'DESC' ]
                ]
            })
                .then((lands) => {
                    console.log(lands)
                        recentlyAdded["success"] = true;
                        recentlyAdded["code"] = 200;
                        recentlyAdded["message"] = "Lands for the corressponding state fetched successfully";
                        recentlyAdded["data"] = [];
                        Object.keys(lands).forEach((key) => {
                            // console.log(key, lands[key]["dataValues"]);
                            recentlyAdded["data"].push(lands[key]["dataValues"]);
                        });
                        //console.log(recentlyAdded);
                        resolve(recentlyAdded);

                    }
                ).catch((err) => console.log("Error: No land found"))
        }
    });
}


function current_location(stateFetched) {
    return new Promise((resolve, reject) => {
        let currentLocation = {};
        if (stateFetched) {
            landBank.findAll({
                where: {
                    State: stateFetched
                }
            }).then((lands) => {
                currentLocation["success"] = true;
                currentLocation["code"] = 200;
                currentLocation["message"] = "Lands for the corressponding state fetched successfully";
                currentLocation["data"] = [];
                Object.keys(lands).forEach((key) => {
                    //console.log(key, lands[key]["dataValues"]);
                    currentLocation["data"].push(lands[key]["dataValues"]);
                });
                //console.log(currentLocation);
                resolve (currentLocation);
            })
                .catch((err) => console.log("Error: No land found"))
        }
    });
}


async function homePage(stateFetched){
    const recentlyAdded = await recently_added(stateFetched);
    //console.log(recentlyAdded);
    const currentLocation = await current_location(stateFetched);
    // console.log(currentLocation);
    let response = {};
    response["RecentlyAdded"] = recentlyAdded;
    response["CurrentLocation"] = currentLocation;
    //console.log(response);
    return response;
}


async function statePage(stateFetched){
    const recentlyAdded = await recently_added(stateFetched);
    //console.log(recentlyAdded);
    const currentLocation = await current_location(stateFetched);
    // console.log(currentLocation);
    let response = {};
    response["RecentlyAdded"] = recentlyAdded;
    response["CurrentLocation"] = currentLocation;
    //console.log(response);
    return response;
}


route.post('/api/location', (req,res) =>{
    const latitude = req.body.lat;
    const longitude = req.body.long;
    // console.log(latitude,longitude)

    geoUrl = 'http://www.geoplugin.net/extras/location.gp?lat='+latitude+'&long='+longitude+'&format=json';
    request(geoUrl, function(err, response, body) {
        // console.log(body);
        // console.log(JSON.parse(body)["geoplugin_region"]);
        const stateFetched = JSON.parse(body)["geoplugin_region"];
        // current_location(stateFetched);
        homePage(stateFetched).then((result) => {
            //console.log(result);
            res.json(result);
        }).catch((err) => console.log("not working"));
    });
});


route.post('/api/state', (req,res) =>{
    const stateFetched = req.body.state;
    //console.log(stateFetched)
    statePage(stateFetched).then((result) => {
        //console.log(result);
        res.json(result);
    }).catch((err) => console.log("not working"));
});

exports = module.exports = route;
