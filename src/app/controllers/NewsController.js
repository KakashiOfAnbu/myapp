class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    // [GET] /news/leaderboard
    leaderboard(req, res) {
        res.render('leaderboard');
    }
}

module.exports = new NewsController();
