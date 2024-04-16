const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentControllers');
const sendLoginCredentialsToAgents = require('../../api/controllers/agentControllers');
const sendEmailToSpecifiqueAgent = require('../../api/controllers/agentControllers'); 
const agentSignIn = require('../../api/controllers/agentControllers'); 
// Route pour la création d'un compte agent par l'administrateur
router.get('/consulter', agentController.getListAgents);
// Importer la fonction d'envoi d'email pour les agents
// Route pour envoyer les e-mails aux agents
router.post('/sendEmail', async (req, res) => {
    try {
        // Appeler la fonction d'envoi d'e-mail pour les agents
        await (agentController.sendLoginCredentialsToAgents());

        // Envoyer une réponse indiquant que l'e-mail a été envoyé avec succès
        res.status(200).json({ message: 'Les e-mails ont été envoyés avec succès aux agents.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des e-mails aux agents:', error.message);

        // Envoyer une réponse d'erreur si l'envoi d'e-mail échoue
        res.status(500).json({ error: 'Erreur lors de l\'envoi des e-mails aux agents.' });
    }
}); 

// Importer la fonction d'envoi d'email par id agent 
// Route pour envoyer les e-mails aux agent par id 
router.post('/sendEmailById/:ObjectId', async (req, res) => {
    try {
        // Appeler la fonction d'envoi d'e-mail pour les agents
        await (agentController.sendEmailToSpecifiqueAgent(ObjectId));

        // Envoyer une réponse indiquant que l'e-mail a été envoyé avec succès
        res.status(200).json({ message: 'Les e-mails ont été envoyés avec succès aux agents spécifique.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi des e-mails aux agents:', error.message);

        // Envoyer une réponse d'erreur si l'envoi d'e-mail échoue
        res.status(500).json({ error: 'Erreur lors de l\'envoi des e-mails aux agents spécifique.' });
    }
}); 

// Route pour la connexion d'un agent
router.post('/signInAgent', async (req, res) => {
    try {
        // Récupérer les informations d'identification de l'agent depuis le corps de la requête
        const { email, password } = req.body;

        // Appeler la fonction pour la connexion de l'agent
        const agent = await (agentController.agentSignIn(email, password));

        // Si la connexion réussit, renvoyer l'agent ou un message de succès
        res.status(200).json({ message: 'Connexion réussie', agent });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'agent:', error.message);

        // Si la connexion échoue, renvoyer un message d'erreur
        res.status(401).json({ error: 'Impossible de se connecter. Vérifiez vos informations d\'identification.' });
    }
});

module.exports = router;
