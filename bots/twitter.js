const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const fs = require('fs');
const FormData = require('form-data');

const twitterApi = require('../services/twitterApi');
const twitterUploadApi = require('../services/twitterUploadApi');
const { textGenerator: text } = require('../lib/textGenerator');
const { imageGenerator } = require('../lib/imageGenerator/imageGenerator');

text()
  .then(async TEXT_GENERATED => {
    const file = await imageGenerator(TEXT_GENERATED)

    const form = new FormData();
    form.append('media_data', fs.readFileSync(file, { encoding: 'base64' }));
    form.append('media_category', 'tweet_image');

    const response = await twitterUploadApi.post('upload.json', form, {
      headers: form.getHeaders()
    });

    return { data: response.data, TEXT_GENERATED };
  })
  .then(async ({ data, TEXT_GENERATED }) => {
    await twitterApi.post('tweets', {
      text: TEXT_GENERATED,
      media: {
        media_ids: [
          data.media_id_string
        ]
      }
    });
  })
  .catch(console.trace);
