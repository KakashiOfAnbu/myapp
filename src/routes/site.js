const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/home', siteController.home);
router.get('/search', siteController.search);
router.get('/toc', siteController.toc);
router.get('/music-player', siteController.player);
router.get('/', siteController.intro);

module.exports = router;
