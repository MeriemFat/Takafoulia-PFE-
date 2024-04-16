const express = require('express');
const router = express.Router(); 
const  SinistreController = require ('../controllers/sinistreControllers');
//Routes 
router.post('/concatUserAndSinistre', SinistreController.concatUserAndSinistre);
router.get('/getAllSinistre', SinistreController.getAllConcatenationsSinistre); 
router.get('/getSinistreWithCodeCient/:CodeClient' , SinistreController.getAllSinistrewithCodeClient); 
router.put('/updateSinistre/:numSinistre', SinistreController.modifierSinistre);
router.get('/getAllUpdate', SinistreController.getAllModifierSinistre); 
router.get('/GetModifierSinistrewithNumSinistre/:numSinistre',SinistreController.getModifierSinistreWithNumsinistre); 
module.exports = router;   