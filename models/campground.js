var mongoose=require("mongoose");
//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    createdat: {type:Date, default:Date.now },
    author: {
       id: {
          type:mongoose.Schema.Types.ObjectId,
          ref: "user"
       },
       username:String
    },
    comments:[
       {
          type: mongoose.Schema.Types.ObjectId,
          ref:"comment"
       } 
    ]
});
module.exports = mongoose.model("Campground",campgroundSchema);