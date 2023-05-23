const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//schema for chinPokomon :D

const chinSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    ability1: {
        type: String,
        required: true,
    },
    ability2: {
        type: String,
        required: true,
    },
    ability3: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    }
},{ timestamps: true} );

module.exports = mongoose.model("Chin", chinSchema)