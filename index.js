'use strict';

const bodyParser = require('body-parser');
const envvar = require('envvar');
const express = require('express');

const handle = require('./lib/handle');

const APP_PORT = envvar.number('APP_PORT', 8080);

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.render('')
});

app.post('/fax/webhook', (req, res, next) => {
  handle.receiveFax(req)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(res.send);
});

app.listen(APP_PORT, () => {
  console.log('server started on port', APP_PORT);
});