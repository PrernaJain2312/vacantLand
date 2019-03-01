const route = require('express').Router();
const landBank = require('../db/models').landBank;
const request = require('request');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

function filter(stateFetched,areaParam, costParam) {
    // console.log("*****************************************")
    return new Promise((resolve,reject) => {
        let filtered = {};
        if (stateFetched) {
            if (areaParam){
                //console.log(areaParam)
                const areaarray =areaParam.split(',');
                const ax= areaarray[0];
                const ay=areaarray[1];
                // console.log(ax,ay)
                if (costParam){
                    // console.log(costParam)
                    const costarray =costParam.split(',');
                    const cx= costarray[0];
                    const cy= costarray[1];
                    // console.log(cx,cy)
                    landBank.findAll({
                        where: {
                            State: stateFetched,
                            Area: {
                                [Op.between]: [ax,ay]
                            },

                            //Area:areaParam,
                            Cost: {
                                [Op.between]: [cx,cy]
                            },
                        },
                        attributes:["id","Name","State","Cost","Area","Image"]
                    }).then((lands) => {
                            // console.log(lands)
                            filtered["success"] = true;
                            filtered["code"] = 200;
                            filtered["message"] = "Lands for the corresponding filter fetched successfully";
                            filtered["data"] = [];
                            Object.keys(lands).forEach((key) => {
                                // console.log(key, lands[key]["dataValues"]);
                                filtered["data"].push(lands[key]["dataValues"]);
                            });

                            // console.log(filtered);
                            resolve (filtered);
                        }
                    ).catch((err) => console.log("Error: No land found for this area and cost"))
                }
                else {
                    landBank.findAll({
                        where: {
                            State: stateFetched,
                            Area: {
                                [Op.between]: [ax, ay]
                            },
                        },
                        attributes:["id","Name","State","Cost","Area","Image"]
                    }).then((lands) => {
                            //console.log("hjguftftftuuu")
                            //console.log(lands)
                            filtered["success"] = true;
                            filtered["code"] = 200;
                            filtered["message"] = "Lands for the coressponding filter fetched successfully";
                            filtered["data"] = [];
                            Object.keys(lands).forEach((key) => {
                                // console.log('******************************************')
                                // console.log(key, lands[key]["dataValues"]);
                                filtered["data"].push(lands[key]["dataValues"]);
                            });
                            // console.log('******in recent function****');
                            // console.log(filtered);
                            resolve (filtered);
                        }
                    ).catch((err) => console.log("Error: No land for this area found"))
                }
            }
            else if(costParam){
                // console.log(costParam)
                const costarray =costParam.split(',');
                const cx= costarray[0];
                const cy= costarray[1];
                // console.log(cx,cy)
                landBank.findAll({
                    where: {
                        State: stateFetched,
                        Cost: {
                            [Op.between]: [cx,cy]
                        },
                    },
                    attributes:["id","Name","State","Cost","Area","Image"]
                })
                    .then((lands) => {
                            //console.log(lands)
                            filtered["success"] = true;
                            filtered["code"] = 200;
                            filtered["message"] = "all Lands for the coressponding state fetched successfully";
                            filtered["data"] = [];
                            Object.keys(lands).forEach((key) => {
                                //console.log(key, lands[key]["dataValues"]);
                                filtered["data"].push(lands[key]["dataValues"]);
                            });
                            // console.log(filtered);
                            resolve (filtered);
                        }
                    ).catch((err) => console.log("Error: No such land found for such cost"))
            }
            else{
                landBank.findAll({
                    where: {
                        State: stateFetched,
                    },
                    attributes:["id","Name","State","Cost","Area","Image"]
                }).then((lands) => {
                        //console.log(lands)
                        filtered["success"] = true;
                        filtered["code"] = 200;
                        filtered["message"] = "all Lands for the coressponding state fetched successfully";
                        filtered["data"] = [];
                        Object.keys(lands).forEach((key) => {
                            console.log(key, lands[key]["dataValues"]);
                            filtered["data"].push(lands[key]["dataValues"]);
                        });
                        // console.log(filtered);

                        resolve(filtered);
                    }
                ).catch((err) => console.log("Error: No such land found for such cost"))
            }
        }})


}
route.post('/filter', (req,res) => {
    const stateFetched = req.body.State;
    const areaParam = req.body.Area;
    const CostParam = req.body.Cost;
    // console.log(x,y)
    filter(stateFetched,areaParam, CostParam)
        .then((result) => {
            console.log(result);
            res.json(result);
        }).catch((err) => console.log("not working"));


});


exports = module.exports = route;