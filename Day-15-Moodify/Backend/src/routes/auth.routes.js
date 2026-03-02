const { Router } = require('express');
const authController = require('../controllers/auth.controllers')
const authMiddlewares = require('../middlewares/auth.middlewares')

const router = Router();


router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)

router.get("/get-me", authMiddlewares.authUser, authController.getMe)

router.get("/logout", authController.logoutUser)

module.exports = router;