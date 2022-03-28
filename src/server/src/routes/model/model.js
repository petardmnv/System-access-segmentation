const express = require('express');
const router = express.Router();
const { getAllModels, getModel } = require('../../controllers/model/modelController.js');

router.get('/model', getAllModels);

router.get('/model/:id', getModel);

module.exports = router;