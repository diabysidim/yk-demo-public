var mongoose =require("mongoose");


var paymentSchema = new mongoose.Schema({
    
                title: String,
                content: String,
                button: String
                
                
                
});


module.exports = mongoose.model("Payment", paymentSchema);