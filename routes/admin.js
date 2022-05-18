const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAdmin = require("../middlewares/isAdmin");

router.post("/approve", isAdmin, adminController.approve);
router.post("/activate-user", isAdmin, adminController.activateUser);
router.get("/get-user", isAdmin, adminController.getAllUser);
router.get("/get-all-report", isAdmin, adminController.getAllReport);
router.get("/get-admin", isAdmin, adminController.getAllAdmin);
router.post("/add-admin", isAdmin, adminController.addAdmin);
router.post("/delete-admin", isAdmin, adminController.deleteAdmin);

module.exports = router;
