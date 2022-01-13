const twitterApi = require('./services/twitterApi');
const { textGenerator: text } = require('./lib/textGenerator');

twitterApi.post('tweets', {
  text: text(),
})