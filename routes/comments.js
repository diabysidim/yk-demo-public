const express = require("express");
const router  = express.Router();  
const Extrait = require("../models/extrait");
const Comment = require("../models/comment");
const Notification = require("../models/notification");
const Temoignage = require("../models/temoignage");


    //new comment


    router.post("/extraits/:id/comments", function(req, res) {
        
        if(req.body.commentUsername===""){
            
            req.body.commentUsername="Anonyme";
            
        }
        
        const newComment = {
                
                username: req.sanitize(req.body.commentUsername),
                comment: req.sanitize(req.body.comment)
                
                    
        };

       
        
        Extrait.findById(req.params.id,function(err, foundExtrait) {
            
            if(err){
                
            console.log(err);
            res.redirect("/extraits");
            }
            
            else{
                
                Comment.create(newComment, function(err, addedComment){
            
                if(err){
                    console.log(err);
                }
                else{

                    if(foundExtrait.comments){
                    
                    foundExtrait.comments.push(addedComment);
                    foundExtrait.save();

                    }
                    res.redirect("/extraits/"+foundExtrait._id);
                    
                    
                
                     }
                });

                     const newNotification = {


                        title: foundExtrait.title,
                         id: foundExtrait._id,
                        note: "new comments",
                     }


                Notification.create(newNotification, function(err){
            
                if(err){
                    console.log(err);
                }
                else{
                    
                    console.log("notification added "+ newNotification.id)
                    
                    
                
                     }
                });
                
            }
            
            
        });
        
    });
        
        
        router.delete("/extraits/:id/comments/:comment_id", isLoggedIn , function(req, res){
            
            
            
                    
                    Comment.findByIdAndRemove(req.params.comment_id, function(err,comment){
            
                         if(err){
                            console.log(err);
                            res.redirect("/extraits/"+req.params.id);
                            
                        }

                        else{

                            Extrait.findById(req.params.id, function(err,foundExtrait){
                
                                if(err){
                                    console.log("there is an error!!");
                                    console.log(err);
                                }
                                
                                else{

                                    for( let i = 0; i < foundExtrait.comments.length; i++){ 

                                        console.log(req.params.comment_id === foundExtrait.comments[i].toString());

                                        if ( foundExtrait.comments[i].toString() === req.params.comment_id) {

                                            console.log("foundyou");

                                            foundExtrait.comments.splice(i, 1); 
                                        }
                                    }

                                    Extrait.findByIdAndUpdate(req.params.id, foundExtrait,function(err){
                
                                         if(err){
                                                console.log("there is an error!!");
                                                console.log(err);
                                            
                                        }

                                        console.log(foundExtrait.comments);
                                                
                                    });
                                   
                                   
                                }

                            });


                          
                    
                    
                            console.log("COMMENT DELETED");
                           
                            res.redirect("/extraits/"+req.params.id);
                        
                        }
            });
            
               
        
        
            
        });
        
         // middleware to check if user is logged in







    router.post("/temoignages/:id/comments", function(req, res) {
        
        if(req.body.commentUsername===""){
            
            req.body.commentUsername="Anonyme";
            
        }
        
        const newComment = {
                
                username: req.sanitize(req.body.commentUsername),
                comment: req.sanitize(req.body.comment)
                
                    
        };

       
        
        Temoignage.findById(req.params.id,function(err, foundTemoignage) {
            
            if(err){
                
            console.log(err);
            res.redirect("/temoignages");
            }
            
            else{
                
                Comment.create(newComment, function(err, addedComment){
            
                if(err){
                    console.log(err);
                }
                else{


                    if(foundTemoignage.comments){
                    foundTemoignage.comments.push(addedComment);
                    foundTemoignage.save();
                        }
                    res.redirect("/temoignages/"+foundTemoignage._id);
                    
                    
                
                     }
                });

                     
                
            }
            
            
        });
        
    });






    router.delete("/temoignages/:id/comments/:comment_id", isLoggedIn , function(req, res){
            
            
            
                    
                    Comment.findByIdAndRemove(req.params.comment_id, function(err,comment){
            
                         if(err){
                            console.log(err);
                            res.redirect("/temoignages/"+req.params.id);
                            
                        }

                        else{

                            Temoignage.findById(req.params.id, function(err,foundTemoignage){
                
                                if(err){
                                    console.log("there is an error!!");
                                    console.log(err);
                                }
                                
                                else{

                                    for( let i = 0; i < foundTemoignage.comments.length; i++){ 

                                        console.log(req.params.comment_id === foundTemoignage.comments[i].toString());

                                        if ( foundTemoignage.comments[i].toString() === req.params.comment_id) {

                                            console.log("foundyou");

                                            foundTemoignage.comments.splice(i, 1); 
                                        }
                                    }

                                    Temoignage.findByIdAndUpdate(req.params.id, foundTemoignage,function(err){
                
                                         if(err){
                                                console.log("there is an error!!");
                                                console.log(err);
                                            
                                        }

                                        
                                                
                                    });
                                   
                                   
                                }

                            });


                          
                    
                    
                            console.log("COMMENT DELETED");
                           
                            res.redirect("/temoignages/"+req.params.id);
                        
                        }
            });
            
               
        
        
            
        });
     
    function isLoggedIn(req, res, next){
        
        if(req.isAuthenticated()){
            
            return next();
        }
        
        res.redirect("/login");
    }   
    
    
     
  
        
 
    
     module.exports= router;