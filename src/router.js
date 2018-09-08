const views = require('./views');

let router = function(app) {
    app.get("/addSum", views.view.start);
};

module.exports = router;