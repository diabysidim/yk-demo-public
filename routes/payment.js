
const express = require("express");
const router  = express.Router();
const Payment = require("../models/payment");

// display all the payments in the site

    router.get("/payments", function(req,res){
        
        Payment.find({}, function(err,allpayments){
            
            if(err){
                console.log(err);
            }
            else{
                
                 res.render("payments",{payments: allpayments});
            }
        });
    
    });
    
    
    //diplay the form to create a new payment

    router.get("/payments/new" ,isLoggedIn, function(req,res){
    
        res.render("payment-form");
    });
    
    
 




//add a new payment to the database

    router.post("/payments/new",isLoggedIn, function(req,res){
        
        // grab title and content, and put them inside an object 
        
        // req.body= req.sanitize(req.body);
        
        
           
        console.log("in payment");
        
        
        
       
        
        const newpayment =  {  
                            title: req.sanitize(req.body.title),
                            content: req.sanitize(req.body.content),
                            button:req.sanitize( req.body.button)
                
                         };
                         
                         
        
                         
        // add the object to the database
        
        Payment.create(newpayment, function(err){
            if(err){
                console.log("there is an error!!");
                console.log(err);
            }
            
            else{
                console.log(newpayment)
                console.log("payment added");
            }
            
            
        });
        
        //
        res.redirect("/payments");
    
    });
    
    
    // destroy route
    router.delete("/payments/:id", isLoggedIn, function(req, res){
        
        Payment.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                    
                }
                
                    console.log("DELETED");
                    res.redirect("/payments");
                
        });
            
            
        });
        
        
        
        
        
        // edit form route
        
        router.get("/payments/:id/edit", isLoggedIn, function(req, res){
            
            Payment.findById(req.params.id, function(err,foundpayment){
                
                if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/payments")
            }
            
            else{

                res.render("edit-payment", {payment: foundpayment});
               
            }
                
            });
    
            
            
        });
        
        // update route
        router.put("/payments/:id",isLoggedIn, function(req,res){
            
    
             
        const newpayment =  {  
                            title: req.sanitize(req.body.title),
                            content: req.sanitize(req.body.content),
                            button:req.sanitize( req.body.button)
                
                         };
            
            Payment.findByIdAndUpdate(req.params.id, newpayment,function(err){
                
                 if(err){
                console.log("there is an error!!");
                console.log(err);
        
            }
            
    
                
                
                        

                res.redirect("/payments");
             
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