
const express = require('express'),
    bodyParser = require('body-parser'),
    fetch = require('node-fetch')
    checker=require('./checker.js');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.post('/count',function (req, res) {
    parametri=req.body.json;
    risposta=checker.check(parametri.url, parametri.invocationParameter, parametri.expectedResultData, parametri.expectedResultStatus);
    var risposta1=JSON.stringify(risposta);
    res.send(risposta1);
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
