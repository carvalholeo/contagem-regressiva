const twitterApi = require('../services/twitterApi');
const { textGenerator: text } = require('../lib/textGenerator');
const {imageGenerator} = require('../lib/imageGenerator/imageGenerator');

const TEXT_GENERATED = text();

twitterApi.post('tweets', {
  text: TEXT_GENERATED,
});

imageGenerator(TEXT_GENERATED)
  .then(console.log)
  .catch(console.trace);
