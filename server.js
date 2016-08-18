'use strict';
let express = require('express');
let app = express();
const millisecondsPerSecond = 1000;

let monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

app.get('/:date', function (req, res) {
    // if its an integer 0 or greater, we can treat it as a unix timestamp
    if (parseInt(req.params.date) && parseInt(req.params.date) >= 0) {
        let theDate = new Date(req.params.date * millisecondsPerSecond);
        let theMonth = monthNames[theDate.getUTCMonth()];
        res.send({
            unix: (parseInt(req.params.date)),
            natural: (theMonth + ' ' + theDate.getUTCDate() + ', ' + theDate.getUTCFullYear())
        });
        // if it matches this regex, it should be a natural date
    } else if (decodeURI(req.params.date).search(/(January|February|March|April|May|June?|July|August|September|October|November|December)\s(\d\d?).+?(\d\d\d\d)/) != -1){
        // got the date spitting out the correct value for natural language according to spec
        // timestamp in JS is in milliseconds, unix needs seconds so we divide by 1K
        res.send({
            unix: Date.parse(decodeURI(req.params.date) + 'GMT') / millisecondsPerSecond,
            natural: decodeURI(req.params.date)
        });
      // everything else should return null
    } else {
        res.send({
            unix: null,
            natural: null
        });
    }
});

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});