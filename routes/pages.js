const route = require('express').Router()
const landBank = require('../db/models').landBank
const imageBank = require('../db/models').imageBank

route.get('/home', (req, res) => {
    //var flight = [];
    //var a;
    if (req.user) {
        landBank.findOne({
            where:{
                State: req.query.SearchFlight
            }
        })
            .then((lands) => {
                /*flight = flights
                console.log("done")
                if (flight!== null) {
                    console.log("************************************")
                    console.log("in if")
                    console.log(flight["dataValues"])
                   console.log("************************************")
                    a = flight["dataValues"]
                    return res.status(200).render('home',{ user: req.user, flights: a})
                }
                else {*/
                    return res.status(200).render('home', {user: req.user, lands: lands})
            });
         console.log("************************************")
         //
        //
        // console.log(flight)
    } else
        res.redirect('/users/signin')
})

route.delete('/home/:id', (req, res) => {
    flightBank.destroy({
        where:{
            id: req.params.id
        }
    })
})

route.get('/addLand', (req, res) => {
    if (req.user.username === 'admin1') {
        return res.render('addlands')
    }
    res.redirect('/pages/home')
})

route.post('/addLand', (req, res) => {
    landBank.create({
        Name: req.body.LandName,
        State: req.body.LandState,
        Area: req.body.LandArea,
        Location: req.body.LandLocation,
        Cost: req.body.LandCost,
    })
    res.redirect('/pages/addLand')
})

exports = module.exports = route

