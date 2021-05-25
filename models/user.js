var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var userschema = new mongoose.Schema({
   username: String,
   password: String,
   avatar: String,
   firstname:String,
   lastname: String,
   email:String,
   isadmin: {type: Boolean, default:false}
});
userschema.plugin(passportlocalmongoose);
module.exports= mongoose.model("user", userschema);