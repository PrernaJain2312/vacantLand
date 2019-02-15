const express = require('express')
const app = express()
const config = require('./config');
const session = require('express-session')
const passport = require('./passport')
const path = require('path')


app.use(session({
    secret: 'secret message',
    resave: false,
    saveUninitialized: false
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'hbs')


app.use('/users', require('./routes/users'))
app.use('/', express.static(path.join(__dirname, 'public')))

// app.listen(2626, () =>
//     console.log("Server started on http://localhost:2626"))

app.listen(config.PORT, () => console.log("Server listening to "+ config.PORT))