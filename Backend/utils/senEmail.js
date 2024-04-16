const nodemailer = require('nodemailer');

// Configurer le service d'envoi d'e-mails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'menm4671@gmail.com', // Remplacez par votre adresse e-mail
        pass: '98556615' // Remplacez par votre mot de passe
    }
});

// Fonction pour envoyer un e-mail
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'menm4671@gmail.com', // Adresse e-mail expéditeur
        to: to, // Adresse e-mail destinataire
        subject: subject, // Sujet de l'e-mail
        text: text // Contenu de l'e-mail
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
            throw new Error('Erreur lors de l\'envoi de l\'e-mail');
        } else {
            console.log('E-mail envoyé: ' + info.response);
        }
    });
};

module.exports = sendEmail;
