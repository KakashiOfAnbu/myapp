const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/home', siteController.home);
router.use('/search', siteController.search);
router.use('/toc', siteController.toc);
router.use('/music-player', siteController.player);
router.use('/', siteController.intro);

module.exports = router;
