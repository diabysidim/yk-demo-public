
//libraries
const express         = require("express"),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose"),
        expressSanitizer = require("express-sanitizer"),
        helmet           = require('helmet'),
        compression      = require('compression'),
        methodOverride  = require("method-override");
        

require('dotenv').config()

    
  
    
//models    
    
const User    = require("./models/user");
    


//routes     

const extraitRoutes =require("./routes/extraits"),
        commentRoutes =require("./routes/comments"),
        temoignageRoutes = require("./routes/temoignages"),
        aboutRoutes =require("./routes/about"),
        quoteRoutes =require("./routes/quote"),
        paymentRoutes =require("./routes/payment"),
        indexRoutes =require("./routes/index");
     
   
    
    
    
    
//start of epress app
const app             =  express();
    
   
    
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true , useUnifiedTopology: true});
   
    
    app.use(require("express-session")({
        
        secret: process.env.SECRET_PHRASE,
        resave: false,
        saveUninitialized: false
        }));

    // setting up robot txt
    app.use('/robots.txt', function (req, res, next) {
        res.type('text/plain')
        res.send("User-agent: *\nDisallow:");
        });
     
    // setting up middlewares


    app.use(compression());
    app.use(helmet())
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride("_method"));
    app.use(expressSanitizer());    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use(function(req,res,next){
        
        res.locals.currentUser=req.user;
        next();
        
        
    });
     
    // using routes 
    app.use(extraitRoutes);
    app.use(commentRoutes);
    app.use(temoignageRoutes);
    app.use(aboutRoutes);
    app.use(quoteRoutes);
    app.use(paymentRoutes);
    app.use(indexRoutes);
   
   
    
    
    app.set("view engine", "ejs");
    
  

   
   
app.listen(process.env.PORT || 3000 , function () {
  console.log("Server Has Started on port 3000!");
});