var mongoose =require("mongoose");


var temoignageSchema = new mongoose.Schema({
    
    
                name: String,
                gender: String,
                content: String,
                comments:[{
                	type: mongoose.Schema.Types.ObjectId,
                	ref: "Comment"
            		}] 
               
});


module.exports = mongoose.model("Temoignage", temoignageSchema);