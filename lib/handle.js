'use strict';

const bluebird = require('bluebird');
const multiparty = require('multiparty');

const fax = require('./fax');
const s3 = require('./s3');

exports.receiveFax = bluebird.coroutine(function*(req) {
  const form = new multiparty.Form();

  let destPath;

  form.on('field', (name, value) => {
    if (name === 'fax') {
      value = JSON.parse(value);
      destPath = value.from_number + '/' + value.completed_at;
    }
  })

  form.on('part', (part) => {
    s3.saveFile(destPath, part)
      .then(resp => {
        console.log("done", resp);
      }).catch(err => {
        console.log(err);
      })
  })

  form.parse(req);
});