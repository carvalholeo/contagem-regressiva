const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const FormData = require('form-data');

const twitterApi = require('../services/twitterApi');
const twitterUploadApi = require('../services/twitterUploadApi');
const { textGenerator: text } = require('../lib/textGenerator');
const { imageGenerator } = require('../lib/imageGenerator/imageGenerator');
const { Hashtag } = require('../models');

let attempt = 1;

const { ATTACK_MODE = 0, END_GOV = 1, INAUGURATION = 1 } = process.env;

function twitterBot() {

  text()
    .then(async TEXT_GENERATED => {
      const textContainsUndefined = TEXT_GENERATED.endGov.includes('undefined');
      if (textContainsUndefined) {
        twitterBot();
        throw new Error('Error used for skip next steps.');
      }
      let response, responseInauguration = undefined;

      if (+END_GOV) {
        const file = await imageGenerator(TEXT_GENERATED.endGov);
        const form = new FormData();
        form.append('media_data', file);
        form.append('media_category', 'tweet_image');
        response = await twitterUploadApi.post('upload.json', form, {
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
      }

      if (+INAUGURATION) {
        const inauguration = await imageGenerator(TEXT_GENERATED.inauguration);
        const formInauguration = new FormData();
        formInauguration.append('media_data', inauguration);
        formInauguration.append('media_category', 'tweet_image');
        responseInauguration = await twitterUploadApi.post('upload.json', formInauguration, {
          headers: formInauguration.getHeaders()
        });
        await twitterUploadApi.post('metadata/create', {
          media_id: responseInauguration.data.media_id_string,
          alt_text: {
            text: `Na parte de cima, ao centro, há um ícone de um cronômetro com o fundo azul.
  Abaixo, centralizado, é possível ler o texto "${TEXT_GENERATED.inauguration}".
  Na parte de baixo, centralizado, lê o nome de usuário da página: Arroba Contador Queda.`
          }
        });
      }


      return { data: {
        endGov: response?.data,
        inauguration: responseInauguration?.data
      }, TEXT_GENERATED };
    })
    .then(async ({ data, TEXT_GENERATED }) => {
      const hashtag = await Hashtag.findOne({});

      const text = `${+END_GOV ? TEXT_GENERATED.endGov : ''}

${+ATTACK_MODE ? TEXT_GENERATED.questions : ''}

${+INAUGURATION ? TEXT_GENERATED.inauguration : ''}

${process.env.HASHTAG || hashtag?.hashtag || ''}`

      if (text.trim().length === 0) {
        throw new Error('Text is empty.');
      }
      await twitterApi.post('tweets', {
        text,
        media: {
          media_ids: [
            data?.endGov?.media_id_string || process.env.IMAGE_DEFAULT,
            data?.inauguration?.media_id_string || process.env.IMAGE_DEFAULT
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
      console.trace(error?.response?.data || error?.message || error)
    });
}

module.exports = twitterBot;
