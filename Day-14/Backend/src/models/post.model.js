const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    imgUrl:{
        type: String,
        required: [true, "this img Uri is require for creating a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "user id id required for creating a post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel