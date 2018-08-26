const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    redis = require('redis'),
    path = require('path');

let redisClient = redis.createClient();
redisClient.on('connect', () => { console.log('Connected to Redis...') });
redisClient.on('error', (err) => { console.log("Error" + err) });

const app = express();
//const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, nex) => {
    res.sendFile('index.html');
});

app.get('/rules', (req, res, nex) => {
    res.sendFile(path.resolve('./public/rules.html'));
});

app.get('/team', (req, res, nex) => {
    res.sendFile(path.resolve('./public/team.html'));
});

app.get('/contact', (req, res, nex) => {
    res.sendFile(path.resolve('./public/contact.html'));
});

app.listen(3000, () => {
    console.log('Server started on port ' + 3000);
});