    var mongoose = require("mongoose");
    
    var extraitSchema = {
        
            title:   String,
            date: String,
            content: String,
            likes: Number,
            numViews: Number,
            comments : [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }] 
     
        
    }
    
    module.exports = mongoose.model("extraits", extraitSchema);
    