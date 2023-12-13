class NewsController {
    // [GET], /news
    index(req, res) {
        res.render('news');
    }

    home(req, res) {
        res.render('home');
    }

    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new NewsController();
