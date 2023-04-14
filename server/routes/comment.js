const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const {check} = require('express-validator')
 
router.post("/create", commentController.CreateComment)

router.post("/update", commentController.UpdateComment)

router.delete("/delete", commentController.DeleteComment)

router.get("/comments", commentController.ShowComments)

module.exports = router