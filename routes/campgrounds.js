var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",function(req,res){
    var nomatch;
    if(req.query.search){
        const regex= new RegExp(escapeRegex(req.query.search),"gi"); 
    //campgrounds from db 
    campground.find({name: regex},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
         if(allcampgrounds.length < 1){
            nomatch="No Campground matches with your query, Please try again "
         } 
            res.render("campgrounds/index",{campgrounds:allcampgrounds,page: 'campgrounds', nomatch: nomatch});    
        }
    });
    }
    else{
    //campgrounds from db 
    campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }
        else{
         res.render("campgrounds/index",{campgrounds:allcampgrounds,page: 'campgrounds',nomatch: nomatch});
        }
    });
    }
});

//NEW - Show form to create new campground
router.get("/new",middleware.isloggedin ,function(req,res){
    res.render("campgrounds/new");
});

//CREATE - submit new campground to db
router.post("/",middleware.isloggedin  ,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.image;
    var desc=req.body.description;
    var author ={
        id:req.user._id,
        username:req.user.username
    }
    var newcampground={name:name,price:price,image:image,description:desc,author:author};
    //create a new campground and save to db
    campground.create(newcampground,function(err,newlcreated){
       if(err){
           console.log(err);
       }
       else{
           //redidrect to campgrounds
        res.redirect("/campgrounds");
       }
    });
});

//SHOW - show more info about one campground
router.get("/:id",function(req,res){
    //find the campground with provided id
    campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundcampground);
             //Render show template of the id
             res.render("campgrounds/show", {campground : foundcampground});
        }
    });
});

//EDIT campgrouund route
router.get("/:id/edit",middleware.checkcampgroundownership ,function(req, res){
        campground.findById(req.params.id, function(err, foundcampground){
             res.render("campgrounds/edit",{campground:foundcampground});
         });
});


//Update campground route
router.put("/:id",middleware.checkcampgroundownership, function(req, res){
    //find and update
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedcampground){
      if(err){
          res.redirect("/campgrounds");
      }
      else{
          res.redirect("/campgrounds/"+req.params.id);
      }
    });
});
//Destroy campground route
router.delete("/:id",middleware.checkcampgroundownership, function(req, res){
    campground.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.redirect("/campgrounds");
     }
     else{
        res.redirect("/campgrounds");
     }
    }) ;
});


//
function escapeRegex(text){
    return text.replace(/[+[\]{}()*+?,.\\^$!%\&]/g,"\\$&")
}
module.exports = router;