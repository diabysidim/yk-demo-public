var mongoose =require("mongoose");


var notificationSchema = new mongoose.Schema({
    
    
                title: String,
                id: String,
                note: String,

                
                
                
});


module.exports = mongoose.model("Notification", notificationSchema);