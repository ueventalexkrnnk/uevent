const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')


/* Authentication module : */
 
// POST - http://localhost:3000/api/auth/register
router.post("/register", [ 
    check('login')
    .notEmpty().withMessage("Fields of login not must be empty!")
    .isLength({min: 3, max: 23}).withMessage("Login must be longer than 3 and shorter than 20!")
    .custom(login => !/[^a-z0-9]/.test(login)).withMessage("Only lowercase letters and numbers can be used!"),

    check('email', "Uncorrect email")
    .notEmpty().withMessage("Fields of email not must be empty!")
    .isEmail().withMessage("Uncorrect email!"),

    check('password')
    .isLength({min: 3, max: 23}).withMessage("Password must be longer than 3 and shorter than 20!")
    .custom(password => !/[^a-zA-Z0-9]/.test(password)).withMessage("Password must been to consist of numbers and letters!"),

    check('firstName')
    .notEmpty().withMessage("Fields of first name not must be empty!")
    .isLength({min: 2, max: 30}).withMessage("First name must be longer than 2 and shorter than 30!")
    .custom(firstName => !/[^a-zA-Z]/.test(firstName)).withMessage("First name must been to consist of letters!"),

    check('middleName')
    .notEmpty().withMessage("Fields of middle name not must be empty!")
    .isLength({min: 2, max: 30}).withMessage("Middle name must be longer than 2 and shorter than 30!")
    .custom(firstName => !/[^a-zA-Z]/.test(firstName)).withMessage("Middle name must been to consist of letters!"),

    check('lastName')
    .notEmpty().withMessage("Fields of last name not must be empty!")
    .isLength({min: 2, max: 30}).withMessage("Last name must be longer than 2 and shorter than 30!")
    .custom(firstName => !/[^a-zA-Z]/.test(firstName)).withMessage("Last name must been to consist of letters!"),
], authMiddleware.registerMiddleware, authController.registration)

// POST - http://localhost:3000/api/auth/login
router.post("/login", authController.login)

router.get("/active/:token", authController.activeEmail)

// POST - http://localhost:3000/api/auth/logout
router.post("/logout", authController.logout)

// POST - http://localhost:3000/api/auth/password-reset
router.post("/password-reset", authController.sendPasswordReset)
// router.post("/password-reset", authMiddleware.SendPasswordMailMiddleware, authController.sendPasswordReset)

// POST - http://localhost:3000/api/auth/password-reset/<confirm_token>
router.post("/password-reset/:token", authController.tokenPasswordReset)
// router.post("/password-reset/:token", authMiddleware.TokenPasswordMiddleware, authController.tokenPasswordReset)

module.exports = router
