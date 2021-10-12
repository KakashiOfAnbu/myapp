const Song = require('../models/Song.js');
const { multipleMongooseToObj } = require('../../utils/mongoose');
class SiteController {
    // [GET] /home
    home(req, res, next) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }

    // [GET] /toc
    toc(req, res) {
        res.render('toc');
    }

    // [GET] /music-player
    player(req, res) {
        res.render('player');
    }

    //  [GET] /
    intro(req, res, next) {
        Song.find({})
            .then((songs) => {
                res.render('intro', {
                    songs: multipleMongooseToObj(songs),
                });
            })
            .catch((error) => {
                next(error);
            });
    }
}

module.exports = new SiteController();
