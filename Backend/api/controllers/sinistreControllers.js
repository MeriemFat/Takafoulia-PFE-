const Sinistre = require("../../Shema/Sinistre"); 
const ConcatenationSinistre = require("../../Shema/concatUserAndSinistre")
const Client = require ("../../Shema/Client");
const ModifierSinistre = require ("../../Shema/modifierSinistre");
// fonction pour concatiner user avec son sinistre 
exports.concatUserAndSinistre = async (req, res) => {
    try {
          // Vérification des données d'entrée
          console.log('Données d\'entrée:', req.body);

        const codeClient = req.body.CodeClient;
        
        // Vérification que le code client est présent
        if (!codeClient) {
            return res.status(400).json({ error: 'Le code client est requis' });
        }
        
        // Recherche du client et du sinistre par le code client
        const [client, sinistre] = await Promise.all([
            Client.findOne({ CodeClient: codeClient }),
            Sinistre.findOne({ CodeClient: codeClient })
        ]);
        // pour afficher les donner trouver pour le client et sinistre 
         //console.log('Résultat de la recherche client:', client);
         //console.log('Résultat de la recherche sinistre:', sinistre);
        // Vérification si le client existe
        if (!client) {
            return res.status(404).json({ error: 'Client non trouvé' });
        }

        // Vérification si le sinistre existe
        if (!sinistre) {
            return res.status(404).json({ error: 'Sinistre non trouvé' });
        }

        // Création d'une nouvelle instance de ConcatenationSinistre
        const concatenationSinistre = new ConcatenationSinistre({
            client: client._id,
            sinistre: sinistre._id,
            nom: client.nom,
            prenom: client.prenom,
            password: client.password,
            email: client.email,
            dateNaissance: client.dateNaissance,
            Cin: client.Cin,
            adresse1: client.adresse1,
            adresse2: client.adresse2,
            NumTel: client.NumTel,
            mobile: client.mobile,
            numSinistre: sinistre.numSinistre,
            CodeClient: sinistre.CodeClient,
            codeAgence: sinistre.codeAgence,
            dateDouverture: sinistre.dateDouverture,
            dateSurvenance: sinistre.dateSurvenance,
            montantAregle: sinistre.montantAregle,
            etatRéglement: sinistre.etatRéglement,
            natureSinistre: sinistre.natureSinistre
        });
       
        // Enregistrement de la concaténation dans la base de données
        await concatenationSinistre.save();
      
        // Répondre avec un succès
        res.status(201).json({ message: 'Données concaténées enregistrées avec succès' });
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de la concaténation et de l\'enregistrement :', error.message);
        res.status(500).json({ error: 'Erreur lors de la concaténation et de l\'enregistrement.' });
    }
};
// Afficher tout les sinistres 
// Afficher tout les sinistres avec des champs spécifiques
exports.getAllConcatenationsSinistre = async (req, res) => {
    try {
        // Utilisez `find()` avec une projection pour spécifier les champs que vous souhaitez inclure dans les résultats
        const concatenationSinistre = await ConcatenationSinistre.find({}, {
            numSinistre: 1,
            CodeClient: 1,
            codeAgence:1,
            dateDouverture: 1,
            dateSurvenance: 1,
            montantAregle: 1,
            etatRéglement: 1,
            natureSinistre: 1
            // Ajoutez d'autres champs que vous voulez inclure ici
        });

        // Répondre avec les résultats
        res.status(200).json(concatenationSinistre);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur
        res.status(500).json({ error: error.message });
    }
};
// Fonction pour afficher le détail d'un sinistre pour un client spécifique
exports.getAllSinistrewithCodeClient = async (req, res) => {
    try {
        // Récupérer le code client de la requête
        const CodeClient = req.params.CodeClient;

        // Vérifier si le code client est fourni dans la requête
        if (!CodeClient) {
            return res.status(400).json({ error: "Code client manquant dans la requête" });
        }

        // Rechercher les concaténations selon le code client avec une projection pour inclure des champs spécifiques
        const concatenationSinistre = await ConcatenationSinistre.find({ CodeClient: CodeClient }, {
            numSinistre: 1,
            CodeClient: 1,
            codeAgence:1,
            dateDouverture: 1,
            dateSurvenance: 1,
            montantAregle: 1,
            etatRéglement: 1,
            natureSinistre: 1
        });

        // Vérifier si des résultats ont été trouvés
        if (concatenationSinistre.length === 0) {
            return res.status(404).json({ error: "Aucune sinistre trouvée pour ce code client" });
        }

        // Renvoyer les résultats
        res.status(200).json(concatenationSinistre);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
};

    // fonction pour modifier les contrat et enregistrer dans le shema modifierSinistre 
    exports.modifierSinistre = async (req, res) => {
        try {
            // Vérifier si le contrat existe
            const sinistre = await Sinistre.findOne({ numSinistre: req.params.numSinistre }).exec();
            if (!sinistre) {
                return res.status(404).send('Sinistre non trouvé');
            }
    
            // Rechercher une modification existante pour ce sinistre
            let modificationSinitre = await ModifierSinistre.findOne({ numSinistre: req.params.numSinistre }).exec();
    
            // Si une modification existe déjà, mettre à jour ses champs
            if (modificationSinitre) {
                modificationSinitre.CodeClient = req.body.CodeClient || contrat.CodeClient;
                modificationSinitre.codeAgence = req.body.codeAgence || contrat.codeAgence;
                modificationSinitre.dateDouverture = req.body.dateDouverture || contrat.dateDouverture;
                modificationSinitre.dateSurvenance = req.body.dateSurvenance || contrat.dateSurvenance;
                modificationSinitre.montantAregle = req.body.montantAregle || contrat.montantAregle;
                modificationSinitre.etatRéglement = req.body.etatRéglement || contrat.etatRéglement;
                modificationSinitre.natureSinistre = req.body.natureSinistre || contrat.natureSinistre;
            } else {
                // Si aucune modification existante, créer un nouveau document ModifierSinistre
                modificationSinitre = new ModifierSinistre({
                    numSinistre: req.params.numSinistre,
                    CodeClient: req.body.CodeClient || contrat.CodeClient,
                    codeAgence: req.body.codeAgence || contrat.codeAgence,
                    dateDouverture: req.body.dateDouverture || contrat.dateDouverture,
                    dateSurvenance: req.body.dateSurvenance || contrat.dateSurvenance,
                    montantAregle: req.body.montantAregle || contrat.montantAregle,
                    etatRéglement: req.body.etatRéglement || contrat.etatRéglement,
                    natureSinistre: req.body.natureSinistre || contrat.natureSinistre
                });
            }
    
            // Enregistrer les modifications dans la collection ModifierSinistre
            await modificationSinitre.save();
    
            res.send('Modifications de contrat enregistrées avec succès');
        } catch (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        }
    }; 
    // afficher tou les mofidier sinistre pour  l'agent  
exports.getAllModifierSinistre  = async (req, res)  => {
    try {
        const modifierSinistre = await ModifierSinistre.find();
        res.status(200).json(modifierSinistre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 

 
// afficher ModifierContrat par NumPolice 
exports.getModifierSinistreWithNumsinistre = async (req, res) => {
    try {
        // Récupérer le numéro de police de la requête
        const NumSinistre = req.params.numSinistre;

        // Vérifier si le numéro de police est fourni dans la requête
        if (!NumSinistre) {
            return res.status(400).json({ error: "Numéro de Sinistre manquant dans la requête" });
        }

        // Rechercher les modifications de contrat selon le numéro de police
        const modifierSinistre = await ModifierSinistre.find({ numSinistre: NumSinistre });

        // Vérifier si des résultats ont été trouvés
        if (modifierSinistre.length === 0) {
            return res.status(404).json({ error: "Aucune modification de Sinistre trouvée pour ce numéro de Sinistre" });
        }

        // Renvoyer les résultats
        res.status(200).json(modifierSinistre);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour ajouter une demande de sinistre à un contrat spécifique
exports.AjouterDemandeSinistreAuContrat = async (req, res) => {
    try {
        const { numSinistre, nom, email, description } = req.body;

        // Vérifier si le numéro de sinistre est fourni
        if (!numSinistre) {
            return res.status(400).json({ message: 'Numéro de Sinistre requis' });
        }

        // Vérifier si le sinistre correspondant au numéro de sinistre existe
        const sinistre = await Sinistre.findOne({ numSinistre });
        if (!sinistre) {
            return res.status(404).json({ message: 'Sinistre non trouvé' });
        }

        // Créer une nouvelle demande de sinistre associée au sinistre trouvé
        const nouvelleDemande = new DemandeContrat({ contrat: contrat._id, nom, email, description });

        // Enregistrer la demande dans la base de données
        await nouvelleDemande.save();

        res.status(201).json({ message: 'Demande de contrat ajoutée avec succès au contrat spécifique' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la demande de contrat au contrat spécifique' });
    }
};

exports.consulterDemandeContratAvecContrats = async (req, res) => {
    try {
        // Utiliser aggregate pour regrouper les contrats par demande de contrat
        const demandeContratsAvecContrats = await DemandeContrat.aggregate([
            {
                $lookup: {
                    from: "Contrat", // Nom de la collection de contrats
                    localField: "_id",
                    foreignField: "demandeContrat",
                    as: "contrats"
                }
            }
        ]);

        // Vérifier si des demandes de contrat existent
        if (demandeContratsAvecContrats.length === 0) {
            return res.status(404).json({ error: "Aucune demande de contrat trouvée" });
        }

        // Renvoyer les demandes de contrat avec leurs contrats associés
        res.status(200).json(demandeContratsAvecContrats);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
};
