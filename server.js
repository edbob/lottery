const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    redis = require('redis'),
    path = require('path'),
    hbs = require('express-handlebars');

let redisClient = redis.createClient();
redisClient.on('connect', () => { console.log('Connected to Redis...') });
redisClient.on('error', (err) => { console.log("Error" + err + redisClient.quit()) });

const app = express();

app.use(express.static(path.join(__dirname, 'views')));

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json({
    limit: "10kb"
}));
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
//this.view.fresult.value;
app.post('/lottery/addSum', function (req, res, nex) {
    let sumUser = req.body.fresult;
    let randomId = Math.floor(Math.random() * 9999999);

    redisClient.hmset(randomId, ['userSum', sumUser],
        function (err, reply) {
            if (err) {
                console.log(err);
            }
            console.log(reply);
            res.redirect('/');
        });
});

app.listen(3000, () => {
    console.log('Server started on port ' + 3000);
});