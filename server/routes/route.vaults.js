const express = require('express');
const router = express.Router();
const vaultsController = require('../controllers/controller.vaults.js');
const errorHandler = require('../middlewares/middleware.error-handler.js');
const authenticate = require('../middlewares/middleware.auth.js');

router.get('/', authenticate, errorHandler(vaultsController.getVaults));
router.post('/add', authenticate, errorHandler(vaultsController.addVault));
router.patch('/update/:id', authenticate, errorHandler(vaultsController.updateVault));
router.delete('/delete/:id', authenticate, errorHandler(vaultsController.deleteVault));

module.exports = router;
