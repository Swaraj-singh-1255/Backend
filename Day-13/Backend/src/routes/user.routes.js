const express = require('express');
const userController = require("../controllers/user.controllers")
const identiyUser = require("../middlewares/auth.middlewares")

const userRouter = express.Router();

userRouter.post('/follow/:username', identiyUser, userController.followUserController)
userRouter.post('/unfollow/:username', identiyUser, userController.unfollowUnserController)
userRouter.post('/accept/:username', identiyUser, userController.acceptFollowRequestController)
userRouter.post('/reject/:username', identiyUser, userController.rejectFollowRequestController) 





module.exports = userRouter;