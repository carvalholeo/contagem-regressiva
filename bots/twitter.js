const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const FormData = require('form-data');

const twitterApi = require('../services/twitterApi');
const twitterUploadApi = require('../services/twitterUploadApi');
const { textGenerator: text } = require('../lib/textGenerator');
const { imageGenerator } = require('../lib/imageGenerator/imageGenerator');
const { Hashtag } = require('../models');

let attempt = 1;

const { ATTACK_MODE = 0 } = process.env;

function twitterBot() {

  text()
    .then(async TEXT_GENERATED => {
      const textContainsUndefined = TEXT_GENERATED.endGov.includes('undefined');
      if (textContainsUndefined) {
        twitterBot();
        throw new Error('Error used for skip next steps.');
      }
      const file = await imageGenerator(TEXT_GENERATED.endGov)

      const form = new FormData();
      form.append('media_data', file);
      form.append('media_category', 'tweet_image');

      const response = await twitterUploadApi.post('upload.json', form, {
        headers: form.getHeaders()
      });

      await twitterUploadApi.post('metadata/create', {
        media_id: response.data.media_id_string,
        alt_text: {
          text: `Na parte de cima, ao centro, há um ícone de um cronômetro com o fundo azul.
Abaixo, centralizado, é possível ler o texto "${TEXT_GENERATED.endGov}".
Na parte de baixo, centralizado, lê o nome de usuário da página: Arroba Contador Queda.`
        }
      });

      return { data: response.data, TEXT_GENERATED };
    })
    .then(async ({ data, TEXT_GENERATED }) => {
      const hashtag = await Hashtag.findOne({});
      await twitterApi.post('tweets', {
        text:`${TEXT_GENERATED.endGov}

${+ATTACK_MODE ? TEXT_GENERATED.questions : ''}

${process.env.HASHTAG || hashtag?.hashtag || ''}`,
        media: {
          media_ids: [
            data.media_id_string
          ]
        }
      });
    })
    .catch((error) => {
      if (error?.original?.code === 'ETIMEDOUT' && attempt <= 5) {
        attempt++;
        console.warn(`Timed out to access database. Giving shot number ${attempt}`);
        twitterBot();
        return;
      }
      console.trace(error)
    });
}

module.exports = twitterBot;
