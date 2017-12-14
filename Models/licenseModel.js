const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schema = new Schema({
    LicenseKey: {type: String},
    GeneratedBy: {type: String, required:true},
    GeneratedFor: {type: String, required:true},
    Date: {type: Date, default: Date.now},
    ExpiryDate: {type:Date},
    Bulked:{type:Boolean},
    BulkGroupCode: {type: String},
    UserDetails: Object,
    CurrentUUID: {type: String},
    DateOfActivation:Date,
    AllowedPeriod:{type: String, required:true},
    Status:{type: String, required:true},
    Log:Array
})

var License = mongoose.model('License', schema);


var createLicense = (data) => {
    var license = new License({
        LicenseKey:data.LicenseKey,
        GeneratedBy:data.GeneratedBy,
        GeneratedFor:data.GeneratedFor,
        ExpiryDate:data.ExpiryDate,
        BulkGroupCode:data.BulkGroupCode,
        UserDetails:data.UserDetails,
        CurrentUUID:data.CurrentUUID,
        DateOfActivation:data.DateOfActivation,
        AllowedPeriod:data.AllowedPeriod,
        Status:data.Status,
        Log:data.Log
    })
    return license.save(license);
}

var LicenseCount = () => {
    var _count = 0;
    return License.count({});
}

var ValidateLicense = (LicenseKey) => {
    console.log("VALIDATION CORE",LicenseKey)
    return License.find({
        LicenseKey
    });
}

var TotalNumberOfLicenses = () =>{
    return License.collection.count();
}

var TotalActivatedLicenses = () =>{
    // return License.find({Status:"ACTIVATED"}).exec(function (err,results){
    //     var count = results.length;
    // })
    return License.count({Status:"ACTIVATED"});
}

var TotalExpiredLicenses = () =>{
    // return License.find({Status:"EXPIRED"}).exec(function (err,results){
    //     var count = results.length;
    // })
    return License.count({Status:"EXPIRED"});
}

module.exports = {
    createLicense:createLicense,
    LicenseCount:LicenseCount,
    TotalActivatedLicenses,
    TotalNumberOfLicenses,
    TotalExpiredLicenses,
    ValidateLicense
}