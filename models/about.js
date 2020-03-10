var mongoose =require("mongoose");


var aboutSchema = new mongoose.Schema({
    

                content: String
                
                
});


module.exports = mongoose.model("About", aboutSchema);