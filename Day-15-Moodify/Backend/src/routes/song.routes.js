const express = require('express')
const upload = require('../middlewares/upload.middlewares')
const songController = require("../controllers/song.constroller")
const { routes } = require('../app')

const router = express.Router()

router.post("/", upload.single("song"), songController.uploadSong)

router.get('/',songController.getSong)


module.exports = router