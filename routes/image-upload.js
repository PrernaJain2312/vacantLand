const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multer = require('multer');
const bodyParser = require('body-parser');
const multerS3 = require('multer-s3');
const config = require('../config');
const landBank = require('../db/models').landBank;
const imageBank = require('../db/models').imageBank;
//const upload = require('../services/multer');

//const singleUpload = upload.single('image')


var app = express()
app.use(bodyParser.json());

aws.config.update({
    secretAccessKey: config.SECRET_ACCESS_KEY,
    accessKeyId: config.ACCESS_KEY_ID,
    region: 'us-east-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}

const upload = multer({
    storage: multerS3({
        acl: 'public-read',
        s3: s3,
        bucket: 'sih2019prerna',
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
});

//const singleUpload = upload.single('image');

function land_name() {
    return new Promise((resolve, reject) => {
        const land_name = {};
        landBank.findAll({
            attributes: ['id', 'Name']
        })
            .then((lands) => {
                land_name["data"] = [];
                Object.keys(lands).forEach((key) => {
                    land_name["data"].push(lands[key]["dataValues"]);
                });
                resolve(land_name);
            }).catch((err) => console.log("Error: No land found"))
    })
}

router.get('/imageland', (req,res)=>{
    land_name().then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => console.log("not working"));

});

router.post('/api/image-upload',upload.array('photo',3), function(req, res, next) {
    // console.log(req.files);
    console.log(req)
    const imageUrl = [];
    Object.keys(req.files).forEach((key) => {
        //console.log(key, req.files[key].location);
        imageUrl.push(req.files[key].location);
    });
    imageBank.create({
        imageUrl: imageUrl
    })
    res.json(imageUrl)
});

router.post('/api/testUpload', function(req, res, next) {
    // console.log(req.files);
    console.log(req.body)
    // const imageUrl = [];
    // Object.keys(req.files).forEach((key) => {
    //     //console.log(key, req.files[key].location);
    //     imageUrl.push(req.files[key].location);
    // });
    // imageBank.create({
    //     imageUrl: imageUrl
    // })
    res.json({success: true});
});


module.exports = router;





