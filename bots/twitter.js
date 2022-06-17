const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const FormData = require('form-data');

const twitterApi = require('../services/twitterApi');
const twitterUploadApi = require('../services/twitterUploadApi');
const { textGenerator: text } = require('../lib/textGenerator');
const { imageGenerator } = require('../lib/imageGenerator/imageGenerator');
const { Hashtag } = require('../models');

function twitterBot() {

  text()
    .then(async TEXT_GENERATED => {
      const file = await imageGenerator(TEXT_GENERATED)
  
      const form = new FormData();
      form.append('media_data', file);
      form.append('media_category', 'tweet_image');
  
      const response = await twitterUploadApi.post('upload.json', form, {
        headers: form.getHeaders()
      });
  
      return { data: response.data, TEXT_GENERATED };
    })
    .then(async ({ data, TEXT_GENERATED }) => {
      const hashtag = await Hashtag.findOne({});
      await twitterApi.post('tweets', {
        text:`${TEXT_GENERATED}

${process.env.HASHTAG || hashtag?.hashtag || ''}`,
        media: {
          media_ids: [
            data.media_id_string
          ]
        }
      });
    })
    .catch(console.trace);
}

module.exports = twitterBot;
