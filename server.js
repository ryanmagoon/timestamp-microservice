'use strict';
let express = require('express');
let app = express();

app.get('/:date', function (req, res) {
    // got the date spitting out the correct value for natural language according to spec
    console.log(Date.parse(decodeURI(req.params.date) + 'GMT'));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});