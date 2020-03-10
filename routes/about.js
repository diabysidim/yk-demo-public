const express = require("express");
const router  = express.Router();
const About = require("../models/about");






// display all the sections in the site

    router.get("/about", function(req,res){
        
        About.find({}, function(err,about){
            
            if(err){
                console.log(err);
            }
            else{
                
                 res.render("about",{abouts: about});
            }
        });
    
    });
    
    
    //diplay the form to create a new section

    router.get("/about/new" ,isLoggedIn, function(req,res){
    
        res.render("about-form");
    });
    
    
    //show




//add a new section to the database

    router.post("/about",isLoggedIn, function(req,res){
        
        // grab title and content, and put them inside an object 
        
        // req.body= req.sanitize(req.body);
        
       
        
        const newAbout =  {  
                            
                            content:req.sanitize( req.body.content)
                
                         };
                         
                         
        
                         
        // add the object to the database
        
        About.create(newAbout, function(err){
            if(err){
                console.log("there is an error!!");
                console.log(err);
            }
            
            else{
                
                console.log("section added");
            }
            
            
        });
        
        //
        res.redirect("/about");
    
    });
    
    

     // edit form route
        
        router.get("/about/:id/edit", isLoggedIn, function(req, res){
            
            About.findById(req.params.id, function(err,about){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/about")
            }
            
            else{

                res.render("edit-about", {about: about});
               
            }
                
            });
    
            
            
        });
        
        // update route
        router.put("/about/:id",isLoggedIn, function(req,res){
            
    
             const newAbout =  {  
                            content:  req.sanitize(req.body.content )
                
                         };
            
            About.findByIdAndUpdate(req.params.id, newAbout, function(err){
                
             if(err){
                     
              
                console.log(err);
    
            }
            
        
                
                
                        

                res.redirect("/about");
               
            
                
            });
            
        });
        
    
    
    // destroy route
    router.delete("/about/:id", isLoggedIn, function(req, res){
        
        About.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                   
                }
                
                    console.log("DELETED");
                    res.redirect("/about");
               
        });
            
            
        });
        
        
         // middleware to check if user is logged in
     
    function isLoggedIn(req, res, next){
        
        if(req.isAuthenticated()){
            
            return next();
        }
        
        res.redirect("/login");
    }   
    
   


  
module.exports= router;