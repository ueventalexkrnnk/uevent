const express = require('express')
const router = express.Router()
const subsController = require('../controllers/subsController')

router.post("/create_org_sub/:organiser_id", subsController.CreateSubOrganiser)

router.delete("/delete_org_sub/:organiser_id", subsController.DeleteSubOrganiser)

router.post("/create_event_sub/:event_id", subsController.CreateSubEvent)

router.delete("/delete_event_sub/:event_id", subsController.DeleteSubEvent)

module.exports = router