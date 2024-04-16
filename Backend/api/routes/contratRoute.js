const express = require('express');
const router = express.Router(); 
const  contratController = require ('../controllers/contratController'); 
router.post('/concatenationClientContrat', contratController.concatUserAndContrat);
router.get('/GetAllContrat', contratController.getAllConcatenations);
router.get('/getAllContratWithCodeClient/:CodeClient', contratController.getAllContratwithCodeClient);
router.put('/update/:NumPolice', contratController.modifierContrat);
router.get('/GetAllModifierContrat', contratController.getAllModifierContrat); 
router.get('/GetModifierClient/:NumPolice',contratController.getModifierContratWithNumPolice); 
router.post('/contrat/:NumPolice/demande-contrat/ajouter', contratController.AjouterDemandeContratAuContrat);
router.get('/demandecontrat/:demandeContratId/contrats', contratController.consulterDemandeContratAvecContrats);

module.exports = router;  