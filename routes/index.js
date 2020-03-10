  
  
  const express = require("express");
  const router  = express.Router();
  const  passport        = require("passport"); 
  const Quote      = require("../models/quote");
  const User    = require("../models/user");
  const Notification = require("../models/notification");
  const Extrait = require("../models/extrait");
    
    // display the homepage of the website

    router.get("/home", function(req,res){
         Quote.find({}, function(err,quote){
            
            if(err){
                console.log(err);
            }
            else{
                
                res.render("home",{quotes: quote});
            }
        });
        
    });


    
    
     router.get("/payment", function(req,res){
    
        res.render("payment");
    });
    
  //show form
    
    router.get("/register",isLoggedIn, function(req, res) {
        
        res.render("register");
        
    });


    // show control-center

    router.get("/control",isLoggedIn, function(req, res) {

        Notification.find({}, function(err,notification){

            if(err){
                console.log(err);
            }
            else{

                Extrait.find({}, function(err,extraits){
            
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.render("control-center", {notification:notification, extraits: extraits});
        
                    }
                        });
                
                
            }
        });
        
        
        
    });



    router.delete("/extraits/notification/:id", isLoggedIn, function(req, res){

        

        Notification.findById(req.params.id, function(err,foundNotification){
                
                if(err){
               
                console.log(err);
                res.redirect("/control")
            }
            else{
                

                res.redirect("/extraits/"+foundNotification.id);
           
        
                Notification.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                   
                }
                
                    console.log("DELETED notification");
                    
               
                });

            }

         });
            
            
        });
    
  
    
    
    router.post("/register",isLoggedIn, function(req, res) {
        
        
            
             
         if(req.body.password!== req.body.passwordConfirmation){
           
          
            res.redirect("/redirect");
           alert("les 2 mots de pass sont differents");
           
        }
        
        const username = req.sanitize(req.body.username),
        
        upassword =req.sanitize(req.body.password);
         
        
    User.register(new User({username: username, name:req.body.name, lastName:req.body.lastName}), upassword, function(err, user){
        
        if(err){
            console.log(err);
            return res.render("register");
        }
        else{
            
            passport.authenticate("local")(req,res, function(){
                
                res.redirect("/admins");
            });
            
        }
        
    });
        
    });
        
        
        
    router.get("/login", function(req, res) {
        
        res.render("login");
        
    });
    
    router.post("/login", passport.authenticate("local",{
        
        successRedirect:"/control",
        failureRedirect:"/login"
                    }), function(req,res){
                        
                    }
         
        
    );
    
    router.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");
        
    });
       
       
       
    
    


   
       
     // middleware to check if user is logged in
     
    function isLoggedIn(req, res, next){
        
        if(req.isAuthenticated()){
            
            return next();
        }
        
        res.redirect("/login");
    } 
    
    
    router.get("/contact", function(req, res) {
        
        res.render("contact");
    })
      


      router.get("/admins",isLoggedIn, function(req, res) {

        User.find({}, function(err,users){

            if(err){
                console.log(err);
            }
            else{
        
                res.render("admins", {users: users});
            }
         });
    });


    router.delete("/extraits/notification/:id", isLoggedIn, function(req, res){

        console.log("trying to delete");

        Notification.findById(req.params.id, function(err,foundNotification){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/control")
            }
            else{
               

                res.redirect("/extraits/"+foundNotification.id);
           
        
                Notification.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                   
                }
                
                    console.log("DELETED notification");
                    
               
                });

            }

         });
            
            
        });
    

    router.delete("/admins/:id", isLoggedIn, function(req, res){  

               
        
                User.findByIdAndRemove(req.params.id, function(err){
            
                     if(err){
                            console.log(err);
                   
                        }                


                    console.log("DELETED user");
                    res.redirect("/admins");
               
                });      
            
            
        });

     // edit form route
        
    router.get("/admins/:id/edit", isLoggedIn, function(req, res){
            
            User.findById(req.params.id, function(err,foundAdmin){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/admins")
            }
            
            else{

                res.render("edit-admins", {admin: foundAdmin});
               
            }
                
            });
    
            
            
        });

     router.put("/admins/:id",isLoggedIn, function(req,res){
            
    
            
        
        
            
            
        if(req.body.password!== req.body.passwordConfirmation){
           
          
            
          
           alert("les 2 mots de pass sont differents");

           res.redirect("/redirect");
           
        }
        
        const username = req.sanitize(req.body.username),
        
        upassword =req.sanitize(req.body.password);


        User.findByIdAndRemove(req.params.id, function(err){
            
                     if(err){
                            console.log(err);
                   
                        }   

                        });  



        User.register(new User({username: username, name:req.body.name, lastName:req.body.lastName}), upassword, function(err, user){
        
        if(err){
            console.log(err);
            return res.render("register");
        }
        else{
            
            passport.authenticate("local")(req,res, function(){
                
                res.redirect("/admins");
            });
            
        }
        
        });
                    
               
                });      
         
        

     router.get("*", function(req,res){
    
        res.redirect("/home");
    });
      

      
    module.exports= router;