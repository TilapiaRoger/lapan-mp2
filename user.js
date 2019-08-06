const mongoose = require("mongoose")

var userSchema = mongoose.Schema({
    userId: String,
    username: String,
    password: String,
    realname: String, 
    idNo: String,
    birthday: Date,
    degree: String,
    email: String,
    contactNo: String,
    address: String,
    residence: String
})

var User = mongoose.model("users", userSchema)

module.exports = {
    User
}