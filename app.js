const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    redis = require('redis'),
    path = require('path'),
    hbs = require('express-handlebars'),
    morgan = require('morgan'),
    favicon = require('serve-favicon');

let redisClient = redis.createClient();
redisClient.on('connect', () => { console.log('Connected to Redis...') });
redisClient.on('error', (err) => { console.log("Error" + err + redisClient.quit()) });

const app = express();

app.use(morgan('dev'));

app.use(favicon(path.join(__dirname, 'views/img', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'views')));

app.engine('handlebars', hbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(bodyParser.json({
    limit: "10kb"
}));

//let router = require('./src/router.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', function (req, res, nex) {
    res.render('home');
});

app.get('/rules', (req, res, nex) => {
    res.render('rules');
});

app.get('/team', (req, res, nex) => {
    res.render('team');
});

app.get('/contact', (req, res, nex) => {
    res.render('contact');
});

//router(app);

//let sumUser = model.sumUser;
let randomId = Math.floor(Math.random() * 9999999);

app.post('/addSum', function (req, res, next) {
    let sumUser = req.body.fresult;
    redisClient.hmset(randomId, ['userSum', sumUser],
        function (err, reply) {
            if (err) {
                console.log(err);
            }
            console.log(reply);
            //res.redirect('/');
        });
});


app.listen(3000, () => {
    console.log('Server started on port ' + 3000);
});