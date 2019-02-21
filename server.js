const express = require('express')
const app = express()
const config = require('./config');
const session = require('express-session')
const passport = require('./passport')
const path = require('path')
const hbs = require("hbs")

const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: config.SECRET_ACCESS_KEY,
    accessKeyId: config.ACCESS_KEY_ID,
    region: 'asia pacific (mumbai)'
});

const s3 = new aws.S3();




hbs.registerHelper("ifEquals", function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifNotEqual", function(arg1, arg2, options) {
    return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
});


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
app.use('/pages', require('./routes/pages'))
app.use('/location', require('./routes/location'))
app.use('/', express.static(path.join(__dirname, 'public')))

// app.listen(2626, () =>
//     console.log("Server started on http://localhost:2626"))

app.listen(config.PORT, () => console.log("Server listening to "+ config.PORT))