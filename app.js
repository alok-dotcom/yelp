var express    = require("express"),
    app        = express(),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash");
    passport   = require("passport"),
    localstrategy = require("passport-local"),
    methodoverride = require("method-override");
    campground = require("./models/campground"),
    comment    = require("./models/comment"),
    user       = require("./models/user"),
    seedDB     = require("./seeds");
//requiring routes
var commentroutes    = require("./routes/comments"),
    campgroundroutes = require("./routes/campgrounds"),
    indexroutes       = require("./routes/index");    

mongoose.connect("mongodb+srv://ankit:passraj@aimusic-es8pe.mongodb.net/aichat?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology: true } )
.then(()=>console.log("connected"))
.catch(err=>console.log(err, "not connected"))    
app.use(express.static("public"));
app.use(methodoverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended:true}));
//seed database // seedDB();
app.locals.moment = require("moment");
//Passport config
app.use(require("express-session")({
   secret: "Rusty is a cutest dog",
   resave: false,
   saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

//checking that user is logged in and returning the user.s details to every routes as middleware
app.use(function(req,res , next){
  res.locals.currentuser = req.user;
  res.locals.error= req.flash("error");
  res.locals.success= req.flash("success");
  next();
});

app.use(indexroutes);
app.use("/campgrounds/:id/comments",commentroutes);
app.use("/campgrounds", campgroundroutes);

app.listen(3000,function(){
    console.log("Yelpcamp app server has started");
});