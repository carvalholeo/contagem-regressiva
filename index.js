const luxon = require('luxon');

const twitterApi = require('./services/twitterApi');

twitterApi.post('tweets', {
  text: 'Olá mundo!'
});