// Import the required modules
const express = require("express")
require("dotenv").config();
const router = express.Router()

// importing controllers
const { createRiddle } = require("../controllers/Game")

// Route path
router.get("/createRiddle", createRiddle)

// Export the router for use in the main application
module.exports = router
