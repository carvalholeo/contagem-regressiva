const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const FormData = require("form-data");

const twitterApi = require("../services/twitterApi");
const twitterUploadApi = require("../services/twitterUploadApi");
const { textGenerator: text } = require("../lib/textGenerator");
const { imageGenerator } = require("../lib/imageGenerator/imageGenerator");
const { Hashtag } = require("../models");

const { ATTACK_MODE = 0, SECRETS = 1, PRISON = 1 } = process.env;

async function twitterBot() {
  const textsToTweet = text();
  const hashtag = await Hashtag.findOne({});
  if (+PRISON) {
    const prison = await imageGenerator(textsToTweet.prison);
    const formInauguration = new FormData();
    formInauguration.append("media_data", prison);
    formInauguration.append("media_category", "tweet_image");
    const response = await twitterUploadApi.post(
      "upload.json",
      formInauguration,
      {
        headers: formInauguration.getHeaders(),
      }
    );
    await twitterUploadApi.post("metadata/create", {
      media_id: response.data.media_id_string,
      alt_text: {
        text: `Na parte de cima, ao centro, há um ícone de um cronômetro com o fundo azul.
  Abaixo, centralizado, é possível ler o texto "${textsToTweet.prison}".
  Na parte de baixo, centralizado, lê o nome de usuário da página: Arroba Contador Queda.`,
      },
    });

    const text = `${textsToTweet.prison}

${process.env.HASHTAG || hashtag?.hashtag || ""}`;

    await twitterApi.post("tweets", {
      text,
      media: {
        media_ids: [
          response?.data?.media_id_string || process.env.IMAGE_DEFAULT,
        ],
      },
    });
  }

  if (+SECRETS) {
    const secrets = await imageGenerator(textsToTweet.secret);
    const formInauguration = new FormData();
    formInauguration.append("media_data", secrets);
    formInauguration.append("media_category", "tweet_image");
    const response = await twitterUploadApi.post(
      "upload.json",
      formInauguration,
      {
        headers: formInauguration.getHeaders(),
      }
    );
    await twitterUploadApi.post("metadata/create", {
      media_id: response.data.media_id_string,
      alt_text: {
        text: `Na parte de cima, ao centro, há um ícone de um cronômetro com o fundo azul.
  Abaixo, centralizado, é possível ler o texto "${textsToTweet.secret}".
  Na parte de baixo, centralizado, lê o nome de usuário da página: Arroba Contador Queda.`,
      },
    });

    const text = `${textsToTweet.secret}

${process.env.HASHTAG || hashtag?.hashtag || ""}`;

    await twitterApi.post("tweets", {
      text,
      media: {
        media_ids: [
          response?.data?.media_id_string || process.env.IMAGE_DEFAULT,
        ],
      },
    });
  }
}

module.exports = twitterBot;
