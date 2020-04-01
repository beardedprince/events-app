const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require('../model/model')
const mongoose = require('mongoose');
const db = "mongodb+srv://ollie:olliedb@cluster0-2mplc.mongodb.net/event_db"

mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true }, err => {
    if (err) {
        console.error('error' + err)
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res) => {
    res.send('from api route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error)
        }
        else {
            let payload = { subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})


router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        }
        else {
           if(!user) {
               res.status(401).send('invalid email')
           } else {
            if(user.password !== userData.password){
                res.status(401).send('invalid password')
            }
            else {
                let payload = { subject: user._id}
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
           }
        }
    })
})


router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum danger",
            "date": "2011-10-05T14:48:00.000Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo2",
            "description": "Lorem Ipsum danger vidieo",
            "date": "2013-13-05T14:48:06.512Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo3",
            "description": "Lorem Ipsum danger graveine",
            "date": "1991-10-05T14:48:00.000Z"
        }
    ]
    res.json(events)
})

router.get('/special', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum danger",
            "date": "2011-10-05T14:48:00.000Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo2",
            "description": "Lorem Ipsum danger vidieo",
            "date": "2013-13-05T14:48:06.512Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo3",
            "description": "Lorem Ipsum danger graveine",
            "date": "1991-10-05T14:48:00.000Z"
        }
    ]
    res.json(events)
})
module.exports = router