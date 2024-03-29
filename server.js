const express = require('express');
const fs = require('fs');
const path = require('path');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

app.use(express.static('public'));

app.post('/', function (req, res) {
    var body = '';
    filepath = '/public/highscores.json';

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        fs.writeFile(filepath, body, function () {
            res.end();
        });
    });
});

app.listen(port, function () {
    console.log('listening on port 3000')
})
