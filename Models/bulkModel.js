const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schema = new Schema({
    GeneratedBy: {type: String, required:true},
    GeneratedFor: {type: String, required:true},
    Date: {type: Date, default: Date.now},
    BulkGroupCode: {type: String},
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
        Log:data.Log
    })
    return bulk.save(bulk);
}

var BulkCount = () => {
    var _count = 0;
    return Bulk.count({}); 
}

module.exports = {
    createBulk:createBulk,
    BulkCount:BulkCount
}