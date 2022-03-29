const express = require('express');
const pipelineController = require('../../controllers/pipeline/pipelineController.js')
const { protectRoute } = require('../../middleware/jwtAuth.js');

const router = express.Router();

router.post('/pipeline', protectRoute, pipelineController.uploadFile, (req, res) => {
    console.log(req.file, req.body);
});

module.exports = router;