require('dotenv').config();

const fs = require('fs');
const FormData = require('form-data');

const twitterApi = require('../services/twitterApi');
const twitterUploadApi = require('../services/twitterUploadApi');
const { textGenerator: text } = require('../lib/textGenerator');
const {imageGenerator} = require('../lib/imageGenerator/imageGenerator');

const TEXT_GENERATED = text();

imageGenerator(TEXT_GENERATED)
  .then(async file => {
    const form = new FormData();
    form.append('media_data', fs.readFileSync(file, {encoding: 'base64'}));
    form.append('media_category', 'tweet_image');

    const response = await twitterUploadApi.post('upload.json', form, {
      headers: form.getHeaders()
    });

    return response.data;
  })
  .then(async data => {
    await twitterApi.post('tweets', {
      text: TEXT_GENERATED,
      media: {
        media_ids: [
          data.media_id_string
        ]
      }
    });
  })
  .catch(async () => {
    await twitterApi.post('tweets', {
        text: TEXT_GENERATED,
    });
  });
