const express = require('express')
const adminModel = require('../Models/adminModel')
const licenseModal = require('../Models/licenseModel');

var router = express.Router()

router.post('/create', (req, res) => {
    adminModel
        .createAdmin(req.body)
        .then(data => res.status(200).send(data))
        .catch(err => {res.status(400).send({err:err});console.log(err)})
});

router.get('/stats',(req,res) =>{
    let resObject = {
        numberOfLicenses:0,
        numberofActivatedLicenses:0,
        numberofExpiredLicenses:0
    }
    licenseModal.TotalNumberOfLicenses().then(data => {
        resObject.numberOfLicenses=data;
        licenseModal.TotalActivatedLicenses().then(data => {
            resObject.numberofActivatedLicenses=data;

            licenseModal.TotalExpiredLicenses().then(data =>{
                resObject.numberofExpiredLicenses=data;
                res.status(200).send(resObject);
            }).catch(err => {res.status(400).send({err:err});console.log(err)})
        }).catch(err => {res.status(400).send({err:err});console.log(err)})
    }).catch(err => {res.status(400).send({err:err});console.log(err)})

});

router.post('/auth',(req,res) => {
    adminModel
        .AuthenticateAdmin(req.body.username,req.body.password)
        .then(data => res.status(200).send(data))
        .catch(err => {res.status(400).send({err:err});console.log(err)})
});

module.exports = router;