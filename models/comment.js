var mongoose = require("mongoose");


var commentschema= new mongoose.Schema({
        text : String,
        createdat: {type:Date, default:Date.now },
        author: {
                id : {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:"user"
                },
                username : String
        }  
});

module.exports = mongoose.model("comment",commentschema);