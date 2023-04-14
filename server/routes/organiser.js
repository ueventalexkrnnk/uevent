const express = require('express')
const router = express.Router()
const organiserController = require('../controllers/organiserController')

router.get("/", organiserController.getAllOrganisers)

router.get("/:organiser_id", organiserController.getInfoByOrganisers)

router.post("/create", organiserController.gettingOrganiserStatus)

router.post("/delete", organiserController.deleteOrganiserStatus)

router.post("/update", organiserController.updateOrganiserStatus)

module.exports = router