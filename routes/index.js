var express = require("express");
var router =express.Router();
var passport = require("passport");
var user = require("../models/user");
var campground = require("../models/campground");

//root route
router.get("/",function(req,res){
    res.render("landing");
});

//========================================
//Auth Routes
//========================================
//Show register form
router.get("/register", function(req,res){
    res.render("register",{page: 'register'});
   })  ;  
   
   //sign up logic
   router.post("/register", function(req,res){
       var newuser=new user(
         {
           username: req.body.username,
           firstname: req.body.firstname,
           lastname:req.body.lastname,
           avatar: req.body.avatar,
           email:req.body.email,
          });
          if(req.body.admincode === "Secretcode123"){
            newuser.isadmin=true;
          }
             user.register(newuser, req.body.password, function(err, user){
              if(err){
                console.log(err);
                return res.render("register", {error: err.message});
               } 
                passport.authenticate("local")(req, res,function(){
                 req.flash("success","Welcome to Yelpcamp "+ user.username);
                 res.redirect("/campgrounds");
              });
          });
       });
   
   //login routes
   //show form
   router.get("/login",function(req,res){
       res.render("login",{page: 'login'});
   });
   //login logic
   router.post("/login",passport.authenticate("local",
      {
        successRedirect:"/campgrounds",
        failureRedirect:"/login",
        failureFlash: true,
        successFlash: "Welcome to YelpCamp"
      }),   
      function(req,res){
   });
   
   // log out route
   router.get("/logout", function(req, res){
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
   });

   //Users profile
   router.get("/users/:id", function(req,res){
     user.findById(req.params.id, function(err, founduser){
       if(err){
         req.flash("error", "Something went wrong");
         res.redirect("/");
       }
       campground.find().where("author.id").equals(founduser._id).exec(function(err, campgrounds){
        if(err){
          req.flash("error", "Something went wrong");
          res.redirect("/");
        }
        res.render("users/show",{user:founduser, campgrounds:campgrounds});
       });
     });
   });
 
   module.exports = router;