// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
mongoose.Promise = global.Promise;
var userArray = new Array();
// define the schema for our user model
var userSchema = mongoose.Schema({

// local            : {
//     email        : String,
//     password     : String
// },
// facebook         : {
//     id           : String,
//     token        : String,
//     email        : String,
//     name         : String
// },
// twitter          : {
//     id           : String,
//     token        : String,
//     displayName  : String,
//     username     : String
// },
// google           : {
//     id           : String,
//     token        : String,
//     email        : String,
//     name         : String
// },
fullname: String,
email: String,
bill: String,
usrtel:Number,
cdno: String,
cvvnumber :String,
usrtel :String,
message:String,
usrtel:  String,
desc:String


});

// generating a hash
userSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
