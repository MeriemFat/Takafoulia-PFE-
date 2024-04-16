const Client = require("../../Shema/Client");
const Contrat = require("../../Shema/Contrat"); 
const Concatenation =require("../../Shema/concatUserAndContrat"); 
const ModifierContrat = require ("../../Shema/modifierContrat"); 
const DemandeContrat = require("../../Shema/DemandeContrat"); 
// concatiner table client avec table contrat 
exports.concatUserAndContrat = async (req, res) => {
    try {
        const { CodeClient } = req.body;

        if (!CodeClient) {
            throw new Error('Le code client est requis');
        }

        // Recherche du client par le CodeClient
        const client = await Client.findOne({ CodeClient });

        if (!client) {
            throw new Error('Client non trouvé');
        }

        // Recherche du contrat par le CodeClient
        const contrat = await Contrat.findOne({ CodeClient });

        if (!contrat) {
            throw new Error('Contrat non trouvé');
        }

        // Création d'une nouvelle instance de Concatenation
        const concatenation = new Concatenation({
            client: client._id,
            contrat: contrat._id,
            name: client.nom,
            prenom: client.prenom, 
            password: client.password,
            email: client.email,
            dateNaissance: client.dateNaissance,
            Cin:client.Cin,
            adresse1:client.adresse1,
            adresse2:client.adresse2,
            NumTel:client.NumTel,
            mobile:client.mobile,
            NumPolice: contrat.NumPolice,
            CodeClient: contrat.CodeClient,
            DateDefait: contrat.DateDefait,
            DescriptionAvenant: contrat.DescriptionAvenant,
            PrimeTTC: contrat.PrimeTTC,
            DateEchance: contrat.DateEchance,
            DateDebutContrat: contrat.DateDebutContrat,
            FractionnementDePayement: contrat.FractionnementDePayement,
        });

        // Enregistrement de la concaténation dans la base de données
        await concatenation.save();

        // Répondre avec un succès
        res.status(200).json({ message: 'Données concaténées enregistrées avec succès' });
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur
        console.error('Erreur lors de la concaténation et de l\'enregistrement :', error.message);
        res.status(500).json({ error: 'Erreur lors de la concaténation et de l\'enregistrement.' });
    }
};
// afficher tou les contrat 
exports.getAllConcatenations = async (req, res)  => {
        try {
            const concatenation = await Concatenation.find();
            res.status(200).json(concatenation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };   
// Fonction pour afficher le détail  d'un contrat pour un client spécifique 
exports. getAllContratwithCodeClient  = async (req, res) => {
        try {
            // Récupérer le code client de la requête
            const CodeClient = req.params.CodeClient;
    
            // Vérifier si le code client est fourni dans la requête
            if (!CodeClient) {
                return res.status(400).json({ error: "Code client manquant dans la requête" });
            }
    
            // Rechercher les concaténations selon le code client
            const concatenations = await Concatenation.find({ CodeClient: CodeClient });
    
            // Vérifier si des résultats ont été trouvés
            if (concatenations.length === 0) {
                return res.status(404).json({ error: "Aucune Contrat trouvée pour ce code client" });
            }
    
            // Renvoyer les résultats
            res.status(200).json(concatenations);
        } catch (error) {
            // Gérer les erreurs
            res.status(500).json({ error: error.message });
        }
    };
    // fonction pour modifier les contrat et enregistrer dans le shema modifierContrat 
    exports.modifierContrat = async (req, res) => {
        try {
            // Vérifier si le contrat existe
            const contrat = await Contrat.findOne({ NumPolice: req.params.NumPolice }).exec();
            if (!contrat) {
                return res.status(404).send('Contrat non trouvé');
            }
    
            // Rechercher une modification existante pour ce contrat
            let modificationContrat = await ModifierContrat.findOne({ NumPolice: req.params.NumPolice }).exec();
    
            // Si une modification existe déjà, mettre à jour ses champs
            if (modificationContrat) {
                modificationContrat.CodeClient = req.body.CodeClient || contrat.CodeClient;
                modificationContrat.DateDefait = req.body.DateDefait || contrat.DateDefait;
                modificationContrat.DescriptionAvenant = req.body.DescriptionAvenant || contrat.DescriptionAvenant;
                modificationContrat.PrimeTTC = req.body.PrimeTTC || contrat.PrimeTTC;
                modificationContrat.DateEchance = req.body.DateEchance || contrat.DateEchance;
                modificationContrat.DateDebutContrat = req.body.DateDebutContrat || contrat.DateDebutContrat;
                modificationContrat.FractionnementDePayement = req.body.FractionnementDePayement || contrat.FractionnementDePayement;
                modificationContrat.Produit = req.body.Produit || contrat.Produit;
            } else {
                // Si aucune modification existante, créer un nouveau document ModifierContrat
                modificationContrat = new ModifierContrat({
                    NumPolice: req.params.NumPolice,
                    CodeClient: req.body.CodeClient || contrat.CodeClient,
                    DateDefait: req.body.DateDefait || contrat.DateDefait,
                    DescriptionAvenant: req.body.DescriptionAvenant || contrat.DescriptionAvenant,
                    PrimeTTC: req.body.PrimeTTC || contrat.PrimeTTC,
                    DateEchance: req.body.DateEchance || contrat.DateEchance,
                    DateDebutContrat: req.body.DateDebutContrat || contrat.DateDebutContrat,
                    FractionnementDePayement: req.body.FractionnementDePayement || contrat.FractionnementDePayement,
                    Produit: req.body.Produit || contrat.Produit
                });
            }
    
            // Enregistrer les modifications dans la collection ModifierContrat
            await modificationContrat.save();
    
            res.send('Modifications de contrat enregistrées avec succès');
        } catch (err) {
            console.error(err);
            res.status(500).send('Erreur serveur');
        }
    }; 
    // afficher tou les mofidier contrat pour  l'agent  
exports.getAllModifierContrat  = async (req, res)  => {
    try {
        const modifiercontrat = await ModifierContrat.find();
        res.status(200).json(modifiercontrat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
// afficher ModifierContrat par NumPolice 
exports.getModifierContratWithNumPolice = async (req, res) => {
    try {
        // Récupérer le numéro de police de la requête
        const numPolice = req.params.NumPolice;

        // Vérifier si le numéro de police est fourni dans la requête
        if (!numPolice) {
            return res.status(400).json({ error: "Numéro de police manquant dans la requête" });
        }

        // Rechercher les modifications de contrat selon le numéro de police
        const modifierContrats = await ModifierContrat.find({ NumPolice: numPolice });

        // Vérifier si des résultats ont été trouvés
        if (modifierContrats.length === 0) {
            return res.status(404).json({ error: "Aucune modification de contrat trouvée pour ce numéro de police" });
        }

        // Renvoyer les résultats
        res.status(200).json(modifierContrats);
    } catch (error) {
        // Gérer les erreurs
        res.status(500).json({ error: error.message });
    }
};
// Fonction pour ajouter une demande de contrat à un contrat spécifique
exports.AjouterDemandeContratAuContrat = async (req, res) => {
    try {
        const { NumPolice, nom, email, description } = req.body;

        // Vérifier si le numéro de police est fourni
        if (!NumPolice) {
            return res.status(400).json({ message: 'Numéro de police requis' });
        }

        // Vérifier si le contrat correspondant au numéro de police existe
        const contrat = await Contrat.findOne({ NumPolice });
        if (!contrat) {
            return res.status(404).json({ message: 'Contrat non trouvé' });
        }

        // Créer une nouvelle demande de contrat associée au contrat trouvé
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
