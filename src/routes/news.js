const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsController');

router.get('/leaderboard', newsController.leaderboard);
router.get('/', newsController.index);

module.exports = router;
