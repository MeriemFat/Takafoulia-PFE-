const User = require('../../Shema/User');
const ListAgent = require('../../Shema/ListAgent');
const nodemailer = require('nodemailer'); 

// Fonction pour consulter la liste des agents
const getListAgents = async (req, res) => {
    try {
        // Récupérer la liste des agents depuis la base de données
        const agents = await ListAgent.find().populate('agent', 'nomUser nomComplet email cpt_Actif libellerAgent');

        // Renvoyer la liste des agents
        res.status(200).json(agents);
    } catch (error) {
        console.error('Erreur lors de la consultation de la liste des agents:', error.message);
        // Répondre avec un message d'erreur
        res.status(500).json({ error: 'Erreur lors de la consultation de la liste des agents.' });
    }
};

// Fonction pour envoyer un email à chaque agent contenant ses informations de connexion
const sendLoginCredentialsToAgents = async () => {
    try {
        // Récupérer la liste des agents depuis la base de données
        const agents = await ListAgent.find();

        // Créer un transporteur SMTP pour l'envoi d'email
        let transporter = nodemailer.createTransport({
            host: 'mail.takaful.tn', // Adresse du serveur SMTP
            port: 465, // Port du serveur SMTP (SSL)
            secure: true, // Utilisez SSL pour sécuriser la connexion SMTP
            auth: {
                user: 'meriam.fathallah@takaful.tn', // Adresse email à partir de laquelle vous envoyez l'email
                pass: 'Pz833**06h20' // Mot de passe de votre adresse email
            }
        });

        // Parcourir la liste des agents et envoyer un email à chacun
        for (const agent of agents) {
            let mailOptions = {
                from: 'meriam.fathallah@takaful.tn', // Adresse email de l'expéditeur
                to: agent.email, // Adresse email de l'agent
                subject: 'Informations de connexion', // Sujet de l'email
                text: `Bonjour ${agent.nomComplet},\n\nVoici vos informations de connexion à l'application :\n\nEmail: ${agent.email}\nMot de passe: ${agent.password}\n\nCordialement.` // Corps de l'email
            };

            // Envoyer l'email
            let info = await transporter.sendMail(mailOptions);
            console.log('Email envoyé à', agent.nomComplet, ':', info.response);
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des emails:', error.message);
    }
};

// Fonction pour envoyer un email à un agent spécifique contenant ses informations de connexion
const sendEmailToSpecifiqueAgent = async (ObjectId) => {
    try {
        // Récupérer l'agent depuis la base de données en utilisant son ID
        const agent = await ListAgent.findById(ObjectId);

        // Créer un transporteur SMTP pour l'envoi d'email
        let transporter = nodemailer.createTransport({
            host: 'mail.takaful.tn', // Adresse du serveur SMTP
            port: 465, // Port du serveur SMTP (SSL)
            secure: true, // Utilisez SSL pour sécuriser la connexion SMTP
            auth: {
                user: 'meriam.fathallah@takaful.tn', // Adresse email à partir de laquelle vous envoyez l'email
                pass: 'Pz833**06h20' // Mot de passe de votre adresse email
            }
        });

        // Construire les options de l'e-mail
        let mailOptions = {
            from: 'meriam.fathallah@takaful.tn', // Adresse email de l'expéditeur
            to: agent.email, // Adresse email de l'agent
            subject: 'Informations de connexion', // Sujet de l'e-mail
            text: `Bonjour ${agent.nomComplet},\n\nVoici vos informations de connexion à l'application :\n\nEmail: ${agent.email}\nMot de passe: ${agent.password}\n\nCordialement.` // Corps de l'e-mail
        };

        // Envoyer l'e-mail
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé à', agent.nomComplet, ':', info.response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error.message);
    }
};

const agentSignIn = async (email, password) => {
    try {
        // Recherche de l'agent par son adresse e-mail
        const agent = await ListAgent.findOne({ email });

        // Vérifier si l'agent existe
        if (!agent) {
            throw new Error('Adresse e-mail incorrecte');
        }

        // Vérifier si le mot de passe est correct
        if (agent.password !== password) {
            throw new Error('Mot de passe incorrect');
        }

        // Si les informations d'identification sont valides, retourner l'agent
        return agent;
    } catch (error) {
        throw new Error('Impossible de se connecter. Vérifiez vos informations d\'identification.');
    }
};
module.exports = { getListAgents , sendLoginCredentialsToAgents , sendEmailToSpecifiqueAgent , agentSignIn};