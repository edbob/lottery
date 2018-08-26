const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    redis = require('redis'),
    path = require('path'),
    hbs = require('express-handlebars');

let redisClient = redis.createClient();
redisClient.on('connect', () => { console.log('Connected to Redis...') });
redisClient.on('error', (err) => { console.log("Error" + err) });

const app = express();

app.use(express.static(path.join(__dirname, 'views')));

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
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

app.listen(3000, () => {
    console.log('Server started on port ' + 3000);
});