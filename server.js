const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

app.use(express.static('public'));

app.listen(3000, function(){
    console.log('listening on port 3000')
})
