const express = require("express");
const router = express.Router();

const { createGrievance,
    getGrievances,
    deleteGrievance,
    updateStatus,
    upvoteGrievance
} = require("../Controller/grievanceController");

//Get Grievances......
router.get("/", getGrievances);

//Create Grievance.....
router.post("/", createGrievance);

//Update...
router.put("/:id/status", updateStatus);
router.put("/:id/upvote", upvoteGrievance);
router.delete("/:id", deleteGrievance);

module.exports = router;    