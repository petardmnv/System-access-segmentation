const express = require('express');
const pipelineController = require('../../controllers/pipeline/pipelineController.js')
const { protectRoute } = require('../../middleware/jwtAuth.js');

const router = express.Router();

// Get pipeline arguments needd in ml
router.post('/pipeline', protectRoute, pipelineController.uploadFile, pipelineController.runPipeline);

// Create route for saving result into mongo db Result document
router.post('/result', protectRoute, pipelineController.saveResult);

// Get all results for curent user
router.get('/result', protectRoute, pipelineController.getResults)

module.exports = router;