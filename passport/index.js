const passport = require('passport')
const strategies = require('./strategies')
const userBase = require('../db/models').userBase

passport.use(strategies.localStrategy)

passport.serializeUser(function (user, done) {
    //console.log('serialize' + user.username)
    done(null, user.username)
})

passport.deserializeUser(function(username, done) {
    // console.log('deserialize' + username)

    userBase.findOne({
        where: {username: username}
    })
        .then((user) => done(null, user))
        .catch((err) => done(err))
})

exports = module.exports = passport