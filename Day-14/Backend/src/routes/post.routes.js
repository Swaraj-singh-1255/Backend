const express = require("express")
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require('../middlewares/auth.middlewares')



postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)

/**
 * GET /api/posts/ [protected]
 */

postRouter.get("/", identifyUser, postController.getPostController)


/**
 * GET /api/posts/detail/postid
 * -- return an detil about specific post with the id. also check wheter the post belongs to the user that hte request come from
 */

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

/**
 * @route POST/api/posts/like/:postid
 */
postRouter.post('/like/:postId', identifyUser,postController.likePostConstroller)


module.exports = postRouter
