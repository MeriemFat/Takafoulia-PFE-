const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
router.post('/signupClient', clientController.signUpClient);
router.post('/createAccount', clientController.createClientAccountByAdmin); 
router.post('/createClientAccount', clientController.createClientAccountByAdmin);
router.post('/verifyEmail', clientController.createClientAccountByAdminEmail);  
module.exports = router;