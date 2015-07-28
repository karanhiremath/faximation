'use strict';

const AWS = require('aws-sdk');
const bluebird = require('bluebird');
const envvar = require('envvar');

const S3_BUCKET = envvar.string('S3_BUCKET');
const S3_KEY = envvar.string('S3_KEY');
const S3_SECRET = envvar.string('S3_SECRET');

const s3Client = new bluebird.promisifyAll(new AWS.S3({
  accessKeyId: S3_KEY,
  secretAccessKey: S3_SECRET,
}));

exports.saveFile = (key, file) => {
  return s3Client.putObjectAsync({
    Bucket: S3_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: file,
    ContentLength: file.byteCount,
  });
}