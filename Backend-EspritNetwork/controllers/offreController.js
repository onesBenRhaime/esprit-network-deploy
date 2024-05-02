const Offre = require("../models/offre");
const Condidacy = require("../models/condidacy");
const PassageTest = require("../models/PassageTest");
const Interview = require("../models/interview");
const cron = require('node-cron');
const User = require('../models/user');




async function addOffre(req, res) {
  try {
    // Destructure the request body
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, dateExpiration, created_at, user } = req.body;

    // Input validation
    const errors = {
      titre: titre.length === 0 ? 'Le titre est obligatoire !' : (titre.length > 30 ? 'Le titre ne doit pas dépasser 30 caractères.' : ''),
      typeoffre: typeoffre.length === 0 ? 'Type d\'offre est obligatoire !' : '',
      description: description.length === 0 ? 'Description de l\'offre est obligatoire !' : (description.length > 1300 ? 'La description ne doit pas dépasser 1300 caractères.' : ''),
      competence: competence.length === 0 ? 'Compétence de l\'offre est obligatoire !' : '',
      typecontrat: typecontrat ? '' : 'Type de contrat de l\'offre est obligatoire !',
    };

    // Check for errors in the validation
    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      // If there are validation errors, return a 400 Bad Request with error details
      return res.status(400).json({ errors });
    }

    // If validation passes, create and save the Offre instance
    const offre = new Offre({ titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, dateExpiration, created_at, user });
    await offre.save();

    // Return a success response
    res.status(201).json({ message: "Offre added successfully", offre });
  } catch (err) {
    // Handle internal server error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function getAllOffres(req, res) {
  try {
    const offres = await Offre.find({ statusOffre: true }).populate('user').sort({ created_at: -1 });
    res.status(200).json(offres);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

async function getOffreById(req, res) {
  try {
    const offre = await Offre.findById(req.params.id).populate('user');
    res.status(200).json(offre);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

const getOfferByIdUser = async (req, res) => {
  try {
    const offers = await Offre.find({ user: req.params.id, statusOffre: true }).populate('user').sort({ created_at: -1 });

    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching and updating offers by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function archiverOffer(req, res) {
  try {
    const updatedOffre = await Offre.findByIdAndUpdate(
      req.params.id,
      { $set: { statusOffre: false } },
      { new: true }
    );

    if (!updatedOffre) {
      return res.status(404).json({ message: "Offre not found" });
    }

    res.status(200).json({ message: "Offre status updated successfully", offre: updatedOffre });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}


async function RéutiliserOffer(req, res) {
  try {
    const existingOffre = await Offre.findById(req.params.id);

    if (!existingOffre) {
      return res.status(404).json({ message: "Offre not found" });
    }

    const newOffre = new Offre({
      titre: existingOffre.titre,
      typeoffre: existingOffre.typeoffre,
      description: existingOffre.description,
      competence: existingOffre.competence,
      typecontrat: existingOffre.typecontrat,
      salaire: existingOffre.salaire,
      langue: existingOffre.langue,
      experience: existingOffre.experience,
      created_at: new Date(), 
      user: existingOffre.user, 
    });

    await newOffre.save();

    res.status(200).json({ message: "Offre status reutiliser successfully !", offre: newOffre });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}



const getArchivesByIdUser = async (req, res) => {
  try {
    const offers = await Offre.find({ user: req.params.id, statusOffre: false }).populate('user').sort({ created_at: -1 });

    res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching and updating offers by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function updateOffre(req, res) {
  try {
    // Destructure the request body
    const { titre, typeoffre, description, competence, typecontrat, salaire, langue, experience, created_at, user } = req.body;

    // Input validation
    const errors = {
      titre: titre && titre.length > 30 ? 'Le titre ne doit pas dépasser 30 caractères.' : '',
      typeoffre: typeoffre.length === 0 ? 'Type d\'offre est obligatoire !' : '',
      description: description && description.length > 1300 ? 'La description ne doit pas dépasser 1300 caractères.' : '',
      competence: competence.length === 0 ? 'Compétence de l\'offre est obligatoire !' : '',
      typecontrat: typecontrat ? '' : 'Type de contrat de l\'offre est obligatoire !',
    };

    // Check for errors in the validation
    const hasErrors = Object.values(errors).some(error => error.length > 0);

    if (hasErrors) {
      // If there are validation errors, return a 400 Bad Request with error details
      return res.status(400).json({ errors });
    }

    // Update the Offre instance
    const updatedOffre = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Return a success response
    res.status(200).json({ message: "Offre updated successfully", offre: updatedOffre });
  } catch (err) {
    // Handle internal server error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}




async function supprimerOffre(req, res) {
  try {
    const deletedOffre = await Offre.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Offre deleted successfully", offre: deletedOffre });
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

// Function to update offer status based on expiration date
async function updateOfferStatus() {
  try {
    const currentDate = new Date();
    // Find offers where expiration date is less than current date
    const expiredOffers = await Offre.find({ dateExpiration: { $lt: currentDate }, statusOffre: true });

    // Update status of expired offers
    for (const offer of expiredOffers) {
      offer.statusOffre = false;
      await offer.save();
    }
  } catch (error) {
    console.error('Error updating offer statuses:', error);
  }
}

// cette fonction s"execute chaque minute 
cron.schedule('* * * * *', async () => {
  try {
    // Appeler la fonction d'archivage
    await updateOfferStatus();
  } catch (error) {
    console.error('Erreur lors de l\'archivage des offres expirées :', error);
  }
});

async function getTestByIdUser(req, res) {
  try {
    const { idUser } = req.params;

    // Find the Condidaçy document for the given user ID
    const condidacy = await Condidacy.findOne({ user: idUser });

    if (!condidacy) {
      // If no Condidaçy document is found, return an empty response
      return res.status(200).json([]);
    }

    // Find the PassageTest documents for the Condidaçy
    const passageTests = await PassageTest.find({ idCandidat: condidacy._id });

    // Find the Interview documents for the Condidaçy
    const interviews = await Interview.find({ idCandidat: condidacy._id });

    // Construct the response data with title and invited_at for each PassageTest and Interview
    const responseData = [];

    for (const test of passageTests) {
      // Find the Offre document for the idOffre in the PassageTest
      const offre = await Offre.findById(test.idOffre);

      if (offre) {
        // If Offre document is found, add test title and invited_at to responseData
        responseData.push({
          title: "Test pour l'offre " + offre.titre + " (" + offre.typeoffre + ")",
          invited_at: test.invited_at
        });
      }
    }

    for (const interview of interviews) {
      // Find the Offre document for the idOffre in the Interview
      const offre = await Offre.findById(interview.idOffre);

      if (offre) {
        // If Offre document is found, add interview title and date to responseData
        responseData.push({
          title: "Meet pour l'offre " + offre.titre + " (" + offre.typeoffre + ")",
          date: interview.date
        });
      }
    }

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching PassageTest, Interview, and Offre data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}





async function getStatistiquesOffresParCompetence(req, res) {
  try {
    // Récupérer toutes les offres
    const offres = await Offre.find();

    // Initialiser un objet pour stocker le nombre total de clics pour chaque compétence
    const statistiques = {};

    // Parcourir chaque offre
    for (const offre of offres) {
      // Récupérer les compétences de l'offre
      const competences = offre.competence.split(',');

      // Mettre à jour les statistiques pour chaque compétence
      competences.forEach(competence => {
        // Vérifier si cette compétence existe déjà dans les statistiques
        if (statistiques.hasOwnProperty(competence)) {
          // Si oui, incrémentez le nombre de comptes pour cette compétence
          statistiques[competence] += 1;
        } else {
          // Sinon, initialisez le nombre de comptes pour cette compétence à 1
          statistiques[competence] = 1;
        }
      });
    }

    // Convertir les statistiques en tableau pour l'affichage
    const statistiquesArray = Object.entries(statistiques).map(([competence, count]) => ({ competence, count }));

    res.status(200).json(statistiquesArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getActifCompany(req, res) {
  try {
      // Récupérer toutes les offres
      const offres = await Offre.find();

      // Créer un objet pour stocker le nombre d'offres créées par chaque société
      const companies = {};

      // Compter le nombre d'offres créées par chaque société
      offres.forEach(offre => {
          if (offre.user) {
              if (companies[offre.user]) {
                  companies[offre.user]++;
              } else {
                  companies[offre.user] = 1;
              }
          }
      });

      // Trier les sociétés par nombre d'offres créées (du plus grand au plus petit)
      const sortedCompanies = Object.entries(companies).sort(([,a],[,b]) => b-a);

      // Créer un tableau pour stocker les données à retourner
      const result = [];

      // Récupérer les informations sur chaque société
      for (const [userId, numberOfOffers] of sortedCompanies) {
          const user = await User.findById(userId);
          if (user) {
              result.push({
                  rank: result.length + 1,
                  companyImage: user.pic, // Modifier selon le schéma de votre modèle User
                  companyName: user.name, // Modifier selon le schéma de votre modèle User
                  numberOfOffers: numberOfOffers
              });
          }
      }

      // Envoyer la réponse avec les sociétés les plus actives
      res.json(result);
  } catch (error) {
      console.error("Error fetching active companies:", error);
      res.status(500).json({ message: "Internal server error" });
  }
}


async function getCompetenceByPostuleCompany(req, res) {
  try {
    // Récupérer toutes les candidatures
    const candidacies = await Condidacy.find().populate('offre');

    // Initialiser un objet pour stocker le nombre total de postulations pour chaque compétence
    const competenceCount = {};

    // Compter le nombre total de postulations pour chaque compétence
    candidacies.forEach(condidacy => {
      // Vérifier si l'offre associée à la candidature existe et a une propriété 'competence'
      if (condidacy.offre && condidacy.offre.competence) {
        const competences = condidacy.offre.competence.split(',');
        competences.forEach(competence => {
          competenceCount[competence] = (competenceCount[competence] || 0) + 1;
        });
      }
    });

    // Calculer le nombre total de postulations
    const totalCandidacies = candidacies.length;

    // Calculer le pourcentage de postulations pour chaque compétence
    const competencePercentage = {};
    Object.keys(competenceCount).forEach(competence => {
      competencePercentage[competence] = (competenceCount[competence] / totalCandidacies) * 100;
    });

    // Convertir les pourcentages en tableau pour l'affichage
    const competencePercentageArray = Object.entries(competencePercentage).map(([competence, percentage]) => ({
      competence,
      percentage: percentage.toFixed(2) // Arrondir à deux décimales
    }));

    // Trier les compétences par pourcentage de postulations (du plus grand au plus petit)
    competencePercentageArray.sort((a, b) => b.percentage - a.percentage);

    // Envoyer la réponse avec les compétences les plus postulées et leur pourcentage
    res.status(200).json(competencePercentageArray);
  } catch (error) {
    console.error("Error fetching competence statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function getActifCondidat(req, res) {
  try {
    // Récupérer toutes les candidatures avec les données utilisateur populées
    const candidacies = await Condidacy.find().populate('user');

    // Initialiser un objet pour stocker le nombre total de candidatures soumises par chaque candidat
    const candidatCount = {};

    // Compter le nombre total de candidatures soumises par chaque candidat
    candidacies.forEach(condidacy => {
      // Vérifier si l'utilisateur associé à la candidature existe et a une propriété 'name' (ou tout autre champ identifiant)
      if (condidacy.user && condidacy.user.name) {
        const candidatName = condidacy.user.name;
        candidatCount[candidatName] = (candidatCount[candidatName] || 0) + 1;
      }
    });

    // Trier les candidats par nombre de candidatures soumises (du plus grand au plus petit)
    const sortedCandidats = Object.entries(candidatCount).sort(([, a], [, b]) => b - a);

    // Créer un tableau pour stocker les données à retourner
    const result = [];

    // Récupérer les informations sur chaque candidat
    for (const [candidatName, numberOfCandidacies] of sortedCandidats) {
      // Trouver la candidature associée à ce candidat
      const candidature = candidacies.find(condidacy => condidacy.user.name === candidatName);
      
      // Vérifier si la candidature a un utilisateur associé avec une image de profil
      if (candidature && candidature.user && candidature.user.pic) {
        result.push({
          rank: result.length + 1,
          candidatImage: candidature.user.pic,
          candidatName: candidatName,
          numberOfCandidacies: numberOfCandidacies
        });
      } else {
        // Si aucune image de profil n'est disponible, ajoutez une entrée sans image
        result.push({
          rank: result.length + 1,
          candidatName: candidatName,
          numberOfCandidacies: numberOfCandidacies
        });
      }
    }

    // Envoyer la réponse avec les candidats les plus actifs
    res.json(result);
  } catch (error) {
    console.error("Error fetching active candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  addOffre,
  getAllOffres,
  getOfferByIdUser,
  getOffreById,
  archiverOffer,
  updateOffre,
  getArchivesByIdUser,
  supprimerOffre,
  RéutiliserOffer,
  getStatistiquesOffresParCompetence ,
  getTestByIdUser,
  getActifCompany,
  getCompetenceByPostuleCompany,
  getActifCondidat
};
