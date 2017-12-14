// 1. LicenseKey (TBD)
// 2. GeneratedBy
// 3. GeneratedFor
// 4. Date
// 5. ExpiryDate (TBD)
// 6. BulkGroupCode(TBD)
// 7. UserDetails
// 8. CurrentUUID
// 9. DateOfActivation
// 10. AllowedPeriod
// 11. Status
// 12. Log
// 13. Bulked

const express = require('express')
const licenseModel = require('../Models/licenseModel')
const bulkModel = require('../Models/bulkModel')

let DUMMYAPIKEY = '123456789';
var router = express.Router()

function keyGenerator (id) {
    id++;
    var key = 2344853*id;
    key= key/3;
    key=key*key;
    key=key-(key/2);
    key=key*(id/2);
    key = Math.ceil(key);
    return key; 
}
function getExpiry (days) {
    var datetime = new Date();
    console.log(datetime);
    datetime.setDate(datetime.getDate() + parseInt(days));
    console.log(datetime);
    return datetime;
}

router.post('/generateSingleLicense', (req, res) => {
    
        //License Object to be saved in MongoDB
        var LicenseObject = {
        //**TO BE FILLED
        LicenseKey:"",
        ExpiryDate:"",
        //GOT FROM REQUEST
        Status:"PENDING ACTIVATION",
        UserDetails:{
            FirstName:"zzz",
            LastName:"zzz",
            Email:"zzz"
        },
        CurrentUUID:"zzz",
        DateOfActivation:"",
        AllowedPeriod:req.body.AllowedPeriod,
        GeneratedBy:req.body.GeneratedBy,
        GeneratedFor:req.body.GeneratedFor,
        Log:[],
        Bulked:false
        }
        // 1. Generating License Key and Adding in LicenseObject
        var a=0;
        licenseModel
            .LicenseCount()
            .then(count => {
                LicenseObject.LicenseKey = keyGenerator(count).toString(); //THIS GIVES LICENSE OBJECT
                LicenseObject.ExpiryDate = getExpiry(req.body.AllowedPeriod);
                licenseModel
                .createLicense(LicenseObject)
                .then(data => res.status(200).send(data))
                .catch(err => {res.status(400).send({info:"couldn't complete"});console.log(err)})
            })
    
    
        //res.status(400).send({info:"API KEY DOESN'T MATCH"})
    
    
});


router.post('/generateBulkLicense', (req, res) => {
    if(req.body.APIKEY == DUMMYAPIKEY )
    {
        //License Object to be saved in MongoDB
        var LicenseObject = {
        //**TO BE FILLED
        LicenseKey:"",
        ExpiryDate:"",
        BulkGroupCode:"",
        //GOT FROM REQUEST
        Status:"PENDING ACTIVATION",
        UserDetails:{
            FirstName:"zzz",
            LastName:"zzz",
            Email:"zzz"
        },
        CurrentUUID:"zzz",
        DateOfActivation:"",
        AllowedPeriod:req.body.AllowedPeriod,
        GeneratedBy:req.body.GeneratedBy,
        GeneratedFor:req.body.GeneratedFor,
        Log:[],
        Bulked:true
    }

    var bulkObject = {
        GeneratedBy:req.body.GeneratedBy,
        GeneratedFor:req.body.GeneratedFor,
        BulkGroupCode:"",
        AllowedPeriod:req.body.AllowedPeriod,
        Status:"ACTIVE",
        Log:[]

    }
    // 1. Generating License Key and Adding in LicenseObject
    var a=0;
    let licensesArray = [];
    bulkModel
        .BulkCount()
        .then(count => {
            LicenseObject.BulkGroupCode = count+1;
            bulkModel
                .createBulk(bulkObject)
                .then(data => {
                    //Adding Bulk Licenses in Loop
                    licenseModel
                    .LicenseCount()
                    .then(count => {
                        let allPromises = [];
                        let i=0;
                        const pArr = [];
                        for (i=0;i<=req.body.numberOfLicences;i++)
                        {
                            LicenseObject.LicenseKey = keyGenerator(count+i).toString(); //THIS GIVES LICENSE OBJECT
                            LicenseObject.ExpiryDate = getExpiry(req.body.AllowedPeriod);
                            pArr.push(
                                licenseModel
                                .createLicense(LicenseObject)
                                .then(data => {
                                    licensesArray.push(data.LicenseKey);
                                })
                                .catch(err => {res.status(400).send({info:"couldn't complete"});console.log(err);i=i+req.body.numberOfLicences+10;})
                            )
                        }
                        Promise.all(pArr).then(() => { // wait for all promises to resolve
                            res.status(200).send({info:"Done Releasing Bulk Licenses!!!",licensesArray:licensesArray,bulkNumber:count+1})
                        });
                    })
                    .catch(err => {res.status(400).send({info:"couldn't complete"});console.log(err)})
                })
        })
    }
    else
    {
        res.status(400).send({info:"API KEY DOESN'T MATCH"});
    }
    
});

router.post('/validate',(req,res)=>{

    console.log("VALIDATION");
    licenseModel
        .ValidateLicense(req.body.LicenseKey)
        .then(data => res.status(200).send(data))
        .catch(err => {res.status(400).send({info:"couldn't complete"});console.log(err)})
});





module.exports = router