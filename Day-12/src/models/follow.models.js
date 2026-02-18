const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower:{
        type: String,
    },
    followee:{
        type: String,
    },
    ststus:{
        type: String,
        defolt: "panding",
        enum:{
            values: ["panding", "accepted", "rejected"],
            message: " Status can only be pending, accepted or rejected"
        }

    }
    }, {    timestamps: true
    
})

followSchema.index({ follower: 1, followee: 1}, { unique: true})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel