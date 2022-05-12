const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/submit-report", auth, userController.submitReport);
router.get("/get-reports", auth, userController.getReports);
router.get("/get-reports-by-user", auth, userController.getReportsbyUser);

module.exports = router;
