require('dotenv').config({path: '../.env'});

const axios = require('axios')
const oauth1a = require('axios-oauth-1.0a');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_KEY_SECRET = process.env.CONSUMER_KEY_SECRET;


const options = {
  algorithm: 'HMAC-SHA1',
  includeBodyHash: false,
  key: CONSUMER_KEY,
  secret: CONSUMER_KEY_SECRET,
  token: ACCESS_TOKEN,
  tokenSecret: ACCESS_TOKEN_SECRET,
}

const client = axios.create({
  baseURL: 'https://upload.twitter.com/1.1/media/',
});

oauth1a.default(client, options);

module.exports = client;
