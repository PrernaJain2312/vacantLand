const route = require('express').Router()
const landBank = require('../db/models').landBank
const imageBank = require('../db/models').imageBank

route.get('/home', (req, res) => {
    if (req.user) {
        return res.status(200).render('home', {user: req.user})
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
        return res.render('addLands')
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

