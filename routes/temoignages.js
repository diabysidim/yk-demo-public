const express = require("express");
const router  = express.Router();
const Temoignage = require("../models/temoignage");
const Comment    = require("../models/comment");





// display all the temoignages in the site

    router.get("/temoignages", function(req,res){
        
        Temoignage.find({}, function(err,allTemoignages){
            
            if(err){
                console.log(err);
            }
            else{
                
                 res.render("temoignages",{temoignages: allTemoignages});
            }
        });
    
    });
    
    
    //diplay the form to create a new temoignage

    router.get("/temoignages/new" ,isLoggedIn, function(req,res){
    
        res.render("temoignage-form");
    });
    
    
    //show


router.get("/temoignages/:id", function(req,res){
    
    Temoignage.findById(req.params.id).populate("comments").exec(function(err, foundTemoignage){
            
            if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/temoignages")
            }
            
            else{

                if(foundTemoignage){

                                res.render("temoignage",{temoignage: foundTemoignage});

                            }
                            else{


                                res.redirect("/temoignages");
                            }
               
            }
            
            
                        });
            
    
});


//add a new temoignage to the database

    router.post("/temoignages/new",isLoggedIn, function(req,res){
        
        // grab title and content, and put them inside an object 
        
        // req.body= req.sanitize(req.body);
        
       
        
        const newTemoignage =  {  
                            name: req.sanitize(req.body.name),
                            gender: req.sanitize(req.body.gender),
                            content:req.sanitize( req.body.content)
                
                         };
                         
                         
        
                         
        // add the object to the database
        
        Temoignage.create(newTemoignage, function(err){
            if(err){
                console.log("there is an error!!");
                console.log(err);
            }
            
            else{
                console.log(newTemoignage)
                console.log("temoignage added");
            }
            
            
        });
        
        //
        res.redirect("/temoignages");
    
    });
    
    
    // destroy route
    router.delete("/temoignages/:id", isLoggedIn, function(req, res){
        
        Temoignage.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                    res.redirect("/temoignages")
                }
                else{
                    
                    console.log("DELETED");
                    res.redirect("/temoignages");
                }
        });
            
            
        });
        
        
        
        
        
        // edit form route
        
        router.get("/temoignages/:id/edit-temoignage", isLoggedIn, function(req, res){
            
            Temoignage.findById(req.params.id, function(err,foundTemoignage){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/temoignages")
            }
            
            else{

                res.render("edit-temoignage", {temoignage: foundTemoignage});
               
            }
                
            });
    
            
            
        });
        
        // update route
        router.put("/temoignages/:id",isLoggedIn, function(req,res){
            
    
            
            
            Temoignage.findByIdAndUpdate(req.params.id, 
                {$set: {  name:req.sanitize(req.body.name), 
                            gender: req.sanitize(req.body.gender),
                            content:  req.sanitize(req.body.content),
                                    }},function(err){
                
                 if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/temoignages")
            }
            
            else{
                
                
                        

                res.redirect("/temoignages/"+req.params.id);
               
            }
                
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