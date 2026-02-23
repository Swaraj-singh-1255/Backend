const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const likeModel = require('../models/like.models')


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
async function createPostController(req, res) {
    // console.log(req.body, req.file)

    // const token = req.cookies.token
    // if (!token) {
    //     return res.status(401).json({
    //         message: "Token not povide, Unathorized access"
    //     })
    // }
    // let decoded 
    // try {
    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    // } catch (err) {
    //     return res.status(401).json(
    //         { message: " User not authorized" })
    // }



    // console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "Cohort-2-Insta"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })

}

async function getPostController(req, res) {
    const token = req.cookies.token

    // if (!token) {
    //     return res.status(401).json({
    //         message: "UnAuthorized Access"
    //     })
    // }

    // let decoded = null;

    // try {

    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    // } catch (err) {
    //     return res.status(401).json({
    //         message: "Token Invalid"
    //     })
    // }
    // const userId = decoded.id

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200)
        .json({
            message: "Post Function Successfully",
            posts
        })
}

async function getPostDetailsController(req, res) {
   /*
     const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "UnAuthorized Access"
        })
    }

    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    const  userId = decoded.id*/

    const  userId = req.user.id

    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    return res.status(200).json({
        message:"Post fectched successfully.",
        post
    })

}

async function likePostConstroller(req, res){
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post like successfully",
        like
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostConstroller
} 
