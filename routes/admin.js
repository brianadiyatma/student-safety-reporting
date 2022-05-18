const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.post("/approve", adminController.approve);
router.post("/activate-user", adminController.activateUser);
router.get("/get-user", adminController.getAllUser);
router.get("/get-all-report", adminController.getAllReport);
router.get("/get-admin", adminController.getAllAdmin);
router.post("/add-admin", adminController.addAdmin);
router.post("/delete-admin", adminController.deleteAdmin);

module.exports = router;
