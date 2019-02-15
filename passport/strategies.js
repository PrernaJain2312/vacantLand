const LocalStrategy = require('passport-local').Strategy
const userBase = require('../db/models').userBase
const passwordHash = require('password-hash')

const localStrategy = new LocalStrategy(
    (username, password, done) => {
        userBase.findOne({
            where: {
                username: username
            }
        }).then((user) => {

            if (!user) {
                //Wrong username
                return done(null, false, {message: 'Wrong username'})
            }
            if (passwordHash.verify(password,user.password)) {
                // Correct user and password
                return done(null, user)
            } else {
                // Correct username, wrong password
                return done(null, false, {message: 'Wrong password'})
            }

        }).catch((err) => {
            return done(err)
        })
    })

exports = module.exports = {
    localStrategy
}
