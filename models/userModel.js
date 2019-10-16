var mongoose = require('mongoose');
var mongooseHistory = require('mongoose-history');


var userSchema = new mongoose.Schema({
    uid: {
      type:String,
      required: true,
      unique: true
    },

    name: {
        type:String,
        required: true,

      },

    email: {
        type:String,
        required: true,
        unique: true
      },

    
    phone: {
        type:String,
        required: true,
        unique: true
      }, 



});
userSchema.plugin(mongooseHistory);  
module.exports = mongoose.model('User', userSchema);