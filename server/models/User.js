const { Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
     },
     email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
     },
     password: {
        type: String,
        required: true,
        minLength: 8,
     },
     picture: {
        type: String,
      //   required: true,
     },
     isAdmin: {
        type: Boolean,
        required: true,
        default: false,
     },
     
});

userSchema.pre('save', async function (next) {
   if (this.isNew || this.isModified('password')) {
     const salt = bcrypt.genSaltSync(10);
     this.password = await bcrypt.hash(this.password, salt);
   }
 
   next();
 });
 

 userSchema.methods.isCorrectPassword = async function (password) {
   return bcrypt.compare(password, this.password);
 };
 
const User = model("User", userSchema);

module.exports = User;