const express = require('express')
const adminModel = require('../Models/adminModel')

var router = express.Router()

router.post('/create', (req, res) => {
    adminModel
        .createAdmin(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => {res.status(400).send({err:err});console.log(err)})
});

router.post('/auth',(req,res) => {
    adminModel
        .AuthenticateAdmin(req.body.username,req.body.password)
        .then(data => res.status(200).send(data))
        .catch(err => {res.status(400).send({err:err});console.log(err)})
});

module.exports = router;