const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    Name: {type: String, required:true},
    Email: {type: String},
    Log:Array
})

var Admin = mongoose.model('Admins', schema);


var createAdmin = (data) => {
    var _Admin = new Admin({
        username:data.username,
        password:data.password,
        Name:data.Name,
        Email:data.Email,
        Log:[]
    })
    return _Admin.save(_Admin);
}

var AuthenticateAdmin = (username,password) => {
   return Admin.find({
       username:username,
       password:password
   })
}

module.exports = {
    createAdmin:createAdmin,
    AuthenticateAdmin:AuthenticateAdmin
}