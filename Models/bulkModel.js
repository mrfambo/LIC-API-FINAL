const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schema = new Schema({
    GeneratedBy: {type: String, required:true},
    GeneratedFor: {type: String, required:true},
    Date: {type: Date, default: Date.now},
    BulkGroupCode: {type: String},
    numberOfLicences:{type:String},
    AllowedPeriod:{type: String, required:true},
    Status:{type: String, required:true},
    Log:Array
})

var Bulk = mongoose.model('Bulk', schema);


var createBulk = (data) => {
    var bulk = new Bulk({
        GeneratedBy:data.GeneratedBy,
        GeneratedFor:data.GeneratedFor,
        BulkGroupCode:data.BulkGroupCode,
        AllowedPeriod:data.AllowedPeriod,
        Status:data.Status,
        numberOfLicences:data.numberOfLicences,
        Log:data.Log
    })
    return bulk.save(bulk);
}

var ListBulk = () => {
    return Bulk.find({})
}

var BulkCount = () => {
    var _count = 0;
    return Bulk.count({}); 
}

var getUsers = () =>{
    return Bulk.find().distinct('GeneratedFor');
}

module.exports = {
    createBulk:createBulk,
    BulkCount:BulkCount,
    ListBulk,
    getUsers
}