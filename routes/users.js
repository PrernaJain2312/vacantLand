const route = require('express').Router()
const userBase = require('../db/models').userBase
const passport = require('../passport')
const passwordHash = require('password-hash');


route.get('/signin', (r,s) => s.redirect('/'))
route.get('/signup', (r,s) => s.render('signup'))

route.post('/signup', (req, res) => {
    const hashedPassword = passwordHash.generate(req.body.password);
    userBase.create({
        username: req.body.username,
        password: hashedPassword
    }).then((user) => {
        res.redirect('/')
    })
})

route.post('/signin', passport.authenticate('local', {
    successRedirect: '/pages/home',
    failureRedirect: '/users/signin'
}))

route.get('/test/:id', function(req, res) {
	let x = req.params.id
	const result = {prerna: x}
	res.json(result)
})

exports = module.exports = route