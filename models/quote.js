var mongoose =require("mongoose");


var quoteSchema = new mongoose.Schema({
    

                content: String
                
                
});


module.exports = mongoose.model("Quote", quoteSchema);