const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const userController = require('../controllers/userController')
const uploadAvatar = require('../middlewares/avatarMiddleware')

/* User module : */

// GET - http://localhost:3000/api/users
router.get("/", userController.getAllUsers)

// GET - http://localhost:3000/api/users/<user_id>
router.get("/:user_id", userController.getUserById)

// PATCH - http://localhost:3000/api/users/avatar
router.patch("/avatar", uploadAvatar.single('image'), userController.userAvatar)

// PATCH - http://localhost:3000/api/users/<user_id>
router.patch("/:user_id", [
    check('login')
        .notEmpty().withMessage("Fields of login not must not be empty!")
        .isLength({min: 3, max: 23}).withMessage("Login must be longer than 3 and shorter than 20!")
        .custom(login => !/[^a-z0-9]/.test(login)).withMessage("Only lowercase letters and numbers can be used!"),

    check('email', "Uncorrect email")
        .notEmpty().withMessage("Fields of email not must not be empty!")
        .isEmail().withMessage("Uncorrect email!"),

    check('password')
    .isLength({min: 3, max: 23}).withMessage("Password must be longer than 3 and shorter than 20!")
    .custom(password => !/[^a-zA-Z0-9]/.test(password)).withMessage("Password must been to consist of numbers and letters!"),

    check('firstName')
        .notEmpty().withMessage("Fields of first name not must not be empty!")
        .isLength({min: 2, max: 30}).withMessage("First name must be longer than 2 and shorter than 30!")
        .custom(firstName => !/[^a-zA-Z]/.test(firstName)).withMessage("First name must been to consist of letters!"),

    check('lastName')
        .notEmpty().withMessage("Fields of last name not must not be empty!")
        .isLength({min: 2, max: 30}).withMessage("Last name must be longer than 2 and shorter than 30!")
        .custom(firstName => !/[^a-zA-Z]/.test(firstName)).withMessage("Last name must been to consist of letters!"),
], uploadAvatar.single('image'), userController.updateUserData)

// DELETE - http://localhost:3000/api/users/<user_id>
router.delete("/:id", userController.deleteUser)

module.exports = router