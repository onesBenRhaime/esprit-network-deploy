const express = require("express");
const router = express.Router();
const offreController = require("../controllers/offreController");

router.post('/add', offreController.addOffre);
router.get('/getall', offreController.getAllOffres);
router.get('/getbyidUser/:id', offreController.getOfferByIdUser);
router.get('/getbyid/:id', offreController.getOffreById);
router.post('/archiver/:id', offreController.archiverOffer);
router.put('/update/:id', offreController.updateOffre);
router.get('/getarchivesbyid/:id', offreController.getArchivesByIdUser);
router.delete('/supprimer/:id', offreController.supprimerOffre);
router.post('/Reutiliser/:id', offreController.RéutiliserOffer);
router.get('/statistiques/competences', offreController.getStatistiquesOffresParCompetence);
router.get('/getresultTest/:idUser', offreController.getTestByIdUser);
router.get('/getActifCompany', offreController.getActifCompany);
router.get('/getCompetenceByPostuleCompany', offreController.getCompetenceByPostuleCompany);
router.get('/getActifCondidat', offreController.getActifCondidat);

module.exports = router;
