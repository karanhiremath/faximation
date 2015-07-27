'use strict';

const bluebird = require('bluebird');

const fax = require('./fax');

exports.receiveFax = bluebird.coroutine(function*(fax) {
  const faxPDF = yield fax.getFax(fax.id);
  
});