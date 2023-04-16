const express = require('express')
const router = express.Router()
const organiserController = require('../controllers/organiserController')
const authMiddleware = require('../middlewares/authMiddleware')
const {check} = require('express-validator')

router.get("/", organiserController.getAllOrganisers)

router.get("/:organiser_id", organiserController.getInfoByOrganisers)

router.post("/create", organiserController.gettingOrganiserStatus)

router.delete("/delete", organiserController.deleteOrganiserStatus)

router.post("/update", [ 
    check('title')
    .notEmpty().withMessage("Fields of title not must be empty!")
    .isLength({min: 3, max: 23}).withMessage("Login must be longer than 3 and shorter than 20!")
    .custom(title => !/[^a-z0-9]/.test(title)).withMessage("Only lowercase letters and numbers can be used!"),

    check('description', "Uncorrect desc")
    .notEmpty().withMessage("Fields of title not must be empty!"),

], authMiddleware.registerMiddleware, organiserController.updateOrganiserStatus)

module.exports = router