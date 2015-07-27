'use strict';

/* global describe, it */

const phaxio = require('phaxio');

phaxio.

phaxio.testReceive({
  filenames: 'test.pdf'
}, (err, res) => {
  console.log(res);
})