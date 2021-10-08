class SiteController {
    // [GET] /home
    home(req, res) {
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
    intro(req, res) {
        res.render('intro');
    }
}

module.exports = new SiteController();
