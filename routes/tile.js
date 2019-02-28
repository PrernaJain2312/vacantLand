const route = require('express').Router();
const landBank = require('../db/models').landBank;
const imageBank = require('../db/models').imageBank;
const request = require('request');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

function findland(id){
    return new Promise((resolve,reject) => {
        let filtered = {};
        if (id) {
            console.log(id)
            landBank.findAll({
                where: {
                    id: id,
                },
                attributes: ['id', 'Name','Location']
            }).then((lands) => {
                //console.log(lands)
                filtered["success"] = true;
                filtered["code"] = 200;
                filtered["message"] = "Lands for the corressponding filter fetched successfully";
                filtered["data"] = [];
                Object.keys(lands).forEach((key) => {
                    //console.log(key, lands[key]["dataValues"]);
                    filtered["data"].push(lands[key]["dataValues"]);
                });
                //console.log(filtered);
                //resolve (filtered);
            }).catch((err) => console.log("Error: No land found for this id"))

            imageBank.findAll({
                where: {
                    landId: id,
                },
                attributes:['imageUrl']
            }).then((images) => {
                //console.log(images)
                filtered["image"] = [];
                Object.keys(images).forEach((key) => {
                    //console.log(key, images[key]["imageValues"]);
                    filtered["image"].push(images[key]["dataValues"]);
                });
                //resolve (filtered);
                //console.log(filtered);
                resolve(filtered)
            }).catch((err) => console.log("Error: No image found for this land id"))
        }
    })
}
route.post('/land', (req,res) => {
    const id= req.body.id;
    findland(id)
        .then((result) => {
            //console.log(result);
            res.json(result);
        }).catch((err) => console.log("not working"));
});
exports = module.exports = route;