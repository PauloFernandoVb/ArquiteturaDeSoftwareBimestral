

class HomeController {

    constructor() {

    }

    async homeView(req, res) {
        res.render('home/index', {layout: false});
    }
}

module.exports = HomeController;

