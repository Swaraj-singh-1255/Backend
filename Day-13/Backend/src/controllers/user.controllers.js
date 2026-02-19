const followModel = require("../models/follow.models");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if (followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You connot follow yourself",
        });
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername,
    });
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: " You trying to follow user is not Be Exists inthe database",
        });
    }

    const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
});



    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already followingh ${followeeUsername}`,
            follow: isAlreadyFollowing,
        });
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
    });
    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord,
    });
}

async function unfollowUnserController(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    });
    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not followingh ${followeeUsername}`,
            follow: isUserFollowing,
        });
    }
    await followModel.findByIdAndDelete(isUserFollowing._id);
    res.status(200).json({
        message: `You have unfollowingh ${followeeUsername}`,
    });
}

/**
 * accept the follower
 */
async function acceptFollowRequestController(req, res) {
    const followerUsername = req.params.username;
    const followeeUsername = req.user.username;

    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending",
    });

    if (!followRecord) {
        return res.status(404).json({
            message: "No pending follow request found",
        });
    }

    followRecord.status = "accepted";
    await followRecord.save();

    res.status(200).json({
        message: `You accepted ${followerUsername}'s follow request`,
        follow: followRecord,
    });
}

/**
 * reject the follower
 */

async function rejectFollowRequestController(req, res) {
    const followerUsername = req.params.username;
    const followeeUsername = req.user.username;

    const followRecord = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending",
    });

    if (!followRecord) {
        return res.status(404).json({
            message: "No pending follow request found",
        });
    }

    followRecord.status = "rejected";
    await followRecord.save();

    res.status(200).json({
        message: `You rejected ${followerUsername}'s follow request`,
        follow: followRecord,
    });
}

module.exports = {
    followUserController,
    unfollowUnserController,
    acceptFollowRequestController,
    rejectFollowRequestController,
};
