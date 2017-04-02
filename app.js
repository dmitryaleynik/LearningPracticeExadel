let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let db = require('diskdb');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect('./', ['articles']);










app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000, function () {
    console.log('Pivet');
});
