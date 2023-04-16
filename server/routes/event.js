const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.get("/all", eventController.AllEvents)

router.get("/search_start", eventController.SearchByStartDate)

router.get("/search_end", eventController.SearchByEndDate)

router.get("/search_type", eventController.SearchByType)

router.get("/:event_id", eventController.OneEvent)

router.post("/create", eventController.CreateEvent)

router.patch("/update", eventController.UpdateEvent)

router.delete("/delete/:event_id", eventController.DeleteEvent)

module.exports = router