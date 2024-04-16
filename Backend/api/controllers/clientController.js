const User = require('../../Shema/User');
const ListClient = require('../../Shema/ListeClient'); 
const nodemailer = require('nodemailer'); 
const Contrat = require("../../Shema/Contrat"); 
const Concatenation =require("../../Shema/concatUserAndContrat"); 
const Client = require("../../Shema/Client");

const signUpClient = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Créez un nouvel utilisateur
        const user = new User({
            name,
            email,
            password,
            role: 'Client'
        });

        // Enregistrez le nouvel utilisateur
        await user.save();

        // Créez une nouvelle entrée dans ListeClient avec l'ID de l'utilisateur
        const newClient = new ListClient({
            userId: user._id,
            name, 
            email, 
            password
            // Ajoutez d'autres champs spécifiques aux clients ici
        });

        // Enregistrez les données supplémentaires du client
        await newClient.save();

        res.status(201).json({ message: 'Inscription réussie.' });
    } catch (error) {
        console.error('Erreur lors de l\'inscription du client:', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'inscription du client.' });
    }
};


const createClientAccountByAdmin = async (req, res) => {
    try {
        const { name , email , password } = req.body;

        // Vérifier si l'utilisateur existe dans ListeClient
        const client = await ListClient.findOne({ email });

        if (!client) {
            return res.status(404).json({ error: 'Utilisateur non trouvé dans ListeClient.' });
        }

        // Créer un compte utilisateur avec le rôle client
        const user = new User({
            // Ajoutez d'autres champs si nécessaire
            // Par exemple, vous pouvez copier les informations de l'utilisateur de ListeClient
            name, 
            email,
            password,
            role: 'Client'
        });

        // Enregistrer l'utilisateur
        await user.save();

        res.status(201).json({ message: 'Compte client créé avec succès par l\'administrateur.' });
    } catch (error) {
        console.error('Erreur lors de la création du compte client par l\'administrateur:', error.message);
        res.status(500).json({ error: 'Erreur lors de la création du compte client par l\'administrateur.' });
    }
};

const createClientAccountByAdminEmail = async (req, res) => {
    try {
        const { name , email , password } = req.body;

        // Vérifier si l'utilisateur existe dans ListeClient
        const client = await ListClient.findOne({ email });

        if (!client) {
            return res.status(404).json({ error: 'Utilisateur non trouvé dans ListeClient.' });
        }

        // Créer un compte utilisateur avec le rôle client
        const user = new User({
            // Ajoutez d'autres champs si nécessaire
            // Par exemple, vous pouvez copier les informations de l'utilisateur de ListeClient
            name, 
            email,
            password,
            role: 'Client'
        });

        // Enregistrer l'utilisateur
        await user.save();

        // Envoyer un e-mail à l'utilisateur avec ses informations de connexion
        await sendEmailToClient(email, password);

        res.status(201).json({ message: 'Compte client créé avec succès par l\'administrateur.' });
    } catch (error) {
        console.error('Erreur lors de la création du compte client par l\'administrateur:', error.message);
        res.status(500).json({ error: 'Erreur lors de la création du compte client par l\'administrateur.' });
    }
};

const sendEmailToClient = async (clientEmail, clientPassword) => {
    try {
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
            to: clientEmail, // Adresse email du client
            subject: 'Informations de connexion', // Sujet de l'e-mail
            text: `Bonjour,\n\nVoici vos informations de connexion à l'application :\n\nEmail: ${clientEmail}\nMot de passe: ${clientPassword}\n\nCordialement.` // Corps de l'e-mail
        };

        // Envoyer l'e-mail
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé à', clientEmail, ':', info.response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail:', error.message);
    }
};   
module.exports = { signUpClient , createClientAccountByAdmin , createClientAccountByAdminEmail , sendEmailToClient };