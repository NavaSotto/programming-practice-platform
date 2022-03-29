const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    permission: {
        type: String,
        required: true,
        enum: ["admin", "editor", "user"]
    },
    imgProfile: {
        type: String,
    },
    token:{
        type:String,
         select: false,
    }
})
// {
//     "firstName":"nava", 
//     "lastName":"sotto",
//     "password":"navas",
//     "email":"navas@gmail.com",
//     "permission":"admin"
//     }

module.exports = mongoose.model('user', userSchema)