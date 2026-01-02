// backend/routes/studyPlanRoutes.js
const express = require('express');
const router = express.Router();
const { createStudyPlan } = require('../controllers/studyPlanController');

// Generate study plan
router.post('/', createStudyPlan);

module.exports = router;
