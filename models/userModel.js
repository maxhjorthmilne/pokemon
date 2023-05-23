const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema;

//schema for user that signsup

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


// static signup method

userSchema.statics.signup = async function (email, password){

    //checks if both email and password is sendt
    if(!email || !password){
        throw Error("you must type both password and email")
    }
    //checks if email containts "@" and ".com/no etc"
    if (!validator.isEmail(email)){
        throw Error("Email must be an actual adress")
    }
    //checks if the password is strong enough
    if(!validator.isStrongPassword(password)){
        throw Error("password is not strong enough")
    }
    //checks if the email property is already in the db
    const exists = await this.findOne({ email })
    if(exists){
        throw Error("user already exists")
    }
    //generates salt, which is random data put infront of the password before it is hashed
    const salt = await bcrypt.genSalt(10);
    //hashes the password with both the password and salt
    const hash = await bcrypt.hash(password, salt)

    //creates a user with the email and hashed password
    const user = await this.create({ email, password: hash})

    return user;
}

//static login method

userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error("You must type you email and password")
    }
    const user = await this.findOne({ email })

    if(!user){
        throw Error("user doesnt exist")
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error("incorrect password")
    }

    return user;
}

module.exports = mongoose.model("User", userSchema)