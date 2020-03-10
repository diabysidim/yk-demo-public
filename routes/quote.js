const express = require("express");
const router  = express.Router();
const Quote = require("../models/quote");

 
 
 // edit form route
        
        router.get("/quote/:id/edit", isLoggedIn, function(req, res){
            
            Quote.findById(req.params.id, function(err,quote){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/");
            }
            
            else{

                res.render("edit-quote", {quote: quote});
               
            }
                
            });
    
            
            
        });
 // update route
        router.put("/quote/:id",isLoggedIn, function(req,res){
            
    
             const newQuote =  {  
                            content:  req.sanitize(req.body.content )
                
                         };
            
            Quote.findByIdAndUpdate(req.params.id, newQuote, function(err){
                
             if(err){
                     
                console.log("there is an error!!");
                console.log(err);
    
            }
            
        
                
                
                        

                res.redirect("/");
               
            
                
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