const express = require('express');
const router = express.Router();
const authenticate = require("../middlewares/middleware.auth.js");
const errorHandler = require('../middlewares/middleware.error-handler.js');
const userController = require("../controllers/controller.users.js");

router.post("/add",  errorHandler(userController.add));
router.post("/login", errorHandler(userController.login));
router.get("/verify-token", authenticate, errorHandler(userController.verifyToken));
router.patch("/change-password", authenticate, errorHandler(userController.changePassword));
router.get("/profile", authenticate, errorHandler(userController.getProfile));
router.patch("/profile-image/change", authenticate, errorHandler(userController.changeProfileImage));
router.delete("/profile-image/delete", authenticate, errorHandler(userController.deleteProfileImage));
router.delete("/delete", authenticate, errorHandler(userController.deleteUser));

module.exports = router;
