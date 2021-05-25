var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment    = require("./models/comment");

var data = [
    {
        name: "Clouds rest", 
        image:"/photos/thor.jpg",
        description:"ghhhdg hdhwe wgweuhhw wyeuifg hghgewh hgehhh hehg hewh ewhejhwgew hurfgwvhvewfryehggrtygrghggtrg  gh wyewrvtfurhhwergw  yeyw rywrwvryterhvytrrvegrvur3yrr ubr ru3ueb  u2ueg ue  3 3r3r t t 5tt   trrtttttguyteyryutr634trgtr34rff3ry34 fry3 ury3g v43r "
    },
    {
        name: "Desert", 
        image:"/photos/granite.jpg",
        description:"Blah blah blahghhhdg hdhwe wgweuhhw wyeuifg hghgewh hgehhh hehg hewh ewhejhwgew hurfgwvhvewfryehggrtygrghggtrg  gh wyewrvtfurhhwergw  yeyw rywrwvryterhvytrrvegrvur3yrr ubr ru3ueb  u2ueg ue  3 3r3r t t 5tt   trrtttttguyteyryutr634trgtr34rff3ry34 fry3 ury3g v43r "
    },
    {
        name: "TREES Everywhere", 
        image:"/photos/trees.jpg",
        description:"Blah blah blahghhhdg hdhwe wgweuhhw wyeuifg hghgewh hgehhh hehg hewh ewhejhwgew hurfgwvhvewfryehggrtygrghggtrg  gh wyewrvtfurhhwergw  yeyw rywrwvryterhvytrrvegrvur3yrr ubr ru3ueb  u2ueg ue  3 3r3r t t 5tt   trrtttttguyteyryutr634trgtr34rff3ry34 fry3 ury3g v43r "
    }
];
function seedDB(){
    //Remove all campgrounds
    campground.remove({},function(err){
        if(err){
            console.log(err);
        }
       console.log("removed campground");
        //add a few campgrounds
        data.forEach(function(seed){
        campground.create(seed, function(err, campground){
           if(err){
               console.log(err);
           }
           else{
               console.log("We have created new campground");
               //create a comment
               comment.create({
                                 text:"This place is great , but there is no internet",
                                 author:"HOMER"
                              },function(err,comment){
                                  if(err){
                                      console.log(err);
                                  }
                                  else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                  }
                              });
                 }
            });
        });
    });    
}
module.exports = seedDB;
