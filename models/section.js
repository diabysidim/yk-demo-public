var mongoose =require("mongoose");


var sectionSchema = new mongoose.Schema({
    
    
                title: String,
                content: String
                
                
});


module.exports = mongoose.model("Section", sectionSchema);