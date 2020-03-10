        var mongoose=require("mongoose");
        var commentSchema = new mongoose.Schema({
        
            username:  String,
            comment:  String
            });
    
         module.exports = mongoose.model("Comment", commentSchema);
        
       