  const express = require("express");
  
  const router  = express.Router();
  
  const Extrait = require("../models/extrait");
    

// display all the extraits in the site

    router.get("/extraits", function(req,res){
        
        Extrait.find({}, function(err,allExtraits){
            
            if(err){
                console.log(err);
            }
            else{
                
                 res.render("extraits",{extraits: allExtraits});
            }
        });
    
    });
    
//diplay the form to create a new extrait

    router.get("/extraits/new" ,isLoggedIn, function(req,res){
    
        res.render("extrait-form");
    });

// add a new extrait to the database

    router.post("/extraits/new",isLoggedIn, function(req,res){
        
        // grab title and content, and put them inside an object 
        
        
        // Use of Date.now() function 
            const d = Date(); 
  
        // Converting the number of millisecond in date string 
            const date = d.toString().split(' ').slice(0, 5).join(' ');
  
                                    
        
        const newExtrait =  {  
                            title: req.sanitize(req.body.title),
                            date: date,
                            likes: 0,
                            numViews:0,
                            content:req.sanitize( req.body.content)
                
                         };
                         
        // add the object to the database
        
        Extrait.create(newExtrait, function(err){
            if(err){
                console.log("there is an error!!");
                console.log(err);
            }
            
            else{
                console.log("extrait added");
            }
            
            
        });
        
        //
        res.redirect("/extraits");
    
    });


    
// show an extrait 
    router.get("/extraits/:id", function(req,res){
        
        

               Extrait.findByIdAndUpdate(req.params.id, {$inc: {  numViews: +1}}).populate("comments").exec(function(err, foundExtrait){
                
                 if(err){
                    console.log("there is an error!!");
                    console.log(err);
                    res.redirect("/extraits")
                    }
                    else{
                            


                            if(foundExtrait){

                                res.render("extrait",{extrait: foundExtrait});

                            }
                            else{


                                res.redirect("/extraits");
                            }
                    

                        }
            
            
            
                        });


    });
        
        
        // edit form route
        
        router.get("/extraits/:id/edit", isLoggedIn, function(req, res){
            
            Extrait.findById(req.params.id, function(err,foundExtrait){
                
                if(err){
                
                console.log(err);
                res.redirect("/extraits")
            }
            
            else{

                res.render("edit", {extrait: foundExtrait});
               
            }
                
            });
    
            
            
        });
        
        // update route
        router.put("/extraits/:id",isLoggedIn, function(req,res){
            
    
            
            Extrait.findByIdAndUpdate(req.params.id,  {$set: {  title:req.sanitize(req.body.title),
                            content:  req.sanitize(req.body.content),
                                    }},function(err){
                
                 if(err){
                
                console.log(err);
                res.redirect("/extraits")
            }

            console.log("updated");
            res.redirect("/extraits/"+req.params.id);
            
    
                
            });
            
        });

        router.post("/extraits/:id/likes", function(req,res){


            Extrait.findById(req.params.id, function(err,foundExtrait){
                
                if(err){
                    console.log("there is an error!!");
                    console.log(err);
                }
                                
                 else{

                     foundExtrait.likes=foundExtrait.likes+1;

                            
            
            Extrait.findByIdAndUpdate(req.params.id, foundExtrait,function(err){
                
                 if(err){
                console.log("there is an error!!");
                console.log(err);
                res.redirect("/extraits/"+req.params.id)
            }
            
            else{
                
                
                        

                res.redirect("/extraits/"+req.params.id);
               
            }
                
            });

        }

    });


        });
        
    
    // destroy route
    router.delete("/extraits/:id", isLoggedIn, function(req, res){
        
        Extrait.findByIdAndRemove(req.params.id, function(err){
            
                if(err){
                    console.log(err);
                    console.log("not found");
                    res.redirect("/extraits")
                }
                else{
                   
                    console.log("DELETED");
                    res.redirect("/extraits");
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
         