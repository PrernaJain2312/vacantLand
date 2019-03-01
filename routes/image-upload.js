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


router.get('/imageland', (req, res) => {
    land_name().then((result) => {
        console.log(result);
        res.json(result);
    }).catch((err) => console.log("not working"));

});

router.post('/api/image-upload', upload.array('photo', 3), function (req, res, next) {
    // console.log(req.files);
    console.log(req.body);
    const imageUrl = [];
    Object.keys(req.files).forEach((key) => {
        //console.log(key, req.files[key].location);
        imageUrl.push(req.files[key].location);
    });
    imageBank.create({
        imageUrl: imageUrl,
        landId: req.body["land_id"]
    });
    if (req.body["is_cover"] === "true") {
        landBank.update({Image: imageUrl[0]}, {where: {id: req.body["land_id"]}}).then((result) => {
            console.log("Success");
        }).catch(err => console.log(err));
    }
    console.log(imageUrl);
    res.json(imageUrl)
});

function isNum(n) {
    return parseInt(n) === n;
}

function getLandData(id) {
    return new Promise((resolve, reject) => {
        let response = {};
        landBank.findAll({where: {id: id}}).then((result) => {
            resolve(result);
        }).catch((err) => {
            console.log("err", err);
            response["success"] = false;
            response["code"] = 500;
            response["message"] = "Internal Server Error Broo!!!";
            response["data"] = [];
            console.log(response);
            reject(response);
        });
    });
}

function getLandImage(id) {
    return new Promise((resolve, reject) => {
        let response = {};
        imageBank.findAll({where: {landId: id}}).then((result) => {
            resolve(result);
        }).catch((err) => {
            console.log("err", err);
            response["success"] = false;
            response["code"] = 500;
            response["message"] = "Internal Server Error Broo!!!";
            response["data"] = [];
            console.log(response);
            reject(response);
        })
    });
}

async function getLand(id) {
    let response = {};
    console.log(id);
    let x = await getLandData(id);
    let y = await imageBank.findAll({where: {landId: id}});

    console.log(x);
    console.log(y);
    response["success"] = true;
    response["code"] = 200;
    response["message"] = "Found the corresponding land!";

    let result = x[0]["dataValues"];
    result["image_list"] = [];
    for(let i=0;i<y.length;i++) {
        result["image_list"].push(y[i]["dataValues"]["imageUrl"]);
    }
    response["data"] = result;
    console.log("This is response", response);
    return response;
}

router.get('/api/getLand/:id', (req, res, next) => {
    console.log(req.params);
    var response = {};
    let land_id = req.params["id"];
    if (typeof(land_id) === "string") {
        let isnum = /^\d+$/.test(land_id);
        if (isnum !== true) {
            response["success"] = false;
            response["code"] = 400;
            response["message"] = "Invalid Land ID";
            response["data"] = [];
            res.json(response);
        } else {
            land_id = parseInt(land_id);
        }
    } else if (!isNum(land_id)) {
        response["success"] = false;
        response["code"] = 400;
        response["message"] = "Invalid Land ID";
        response["data"] = [];
        res.json(response);
    } else {
        // Already a valid id
    }
    getLand(land_id).then((result)=> {
        console.log("Inside success");
        res.json(result);
    }).catch((err)=> {
        console.log("Inside");
        console.log(err);
        response["success"] = false;
        response["code"] = 404;
        response["message"] = "Land Not Found";
        response["data"] = [];
        res.json(response);
    });
    // landBank.findAll({where: {id: req.params["id"]}}).then(result => console.log(result[0]["dataValues"]));

});


module.exports = router;





