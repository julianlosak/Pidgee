const { Schema, model} = require("mongoose");
// const bcrypt = require("bcrypt");
const argon2 = require("argon2");

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
        required: true,
     },
     isAdmin: {
        type: Boolean,
        required: true,
        default: false,
     },
});

userSchema.pre("save", async function (next) {
    if (this.isNew || this.isDirectModified("password")) {
      try {
         const hash = await argon2.hash(this.password);
         this.password = hash;
         next();
      } catch (error) {
         next(error);
      }
      //   const saltRounds = 10;
      //   this.password = await bcrypt.hash(this.password, saltRounds);
    } else {
      next();
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
   try {
      return await argon2.verify(this.password, password);
   } catch (error) {
     return false;

      }
   }; 
   //  return bcrypt.compare(password, this.password);
// };

const User = model("User", userSchema);

module.exports = User;