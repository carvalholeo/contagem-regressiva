const { randomInt } = require("crypto");
const { getRandomAdjective } = require("../adjectives");
const { Question } = require("../../models");

const { PERSON_TO_ATTACK } = process.env;

async function questions() {
  try {
    const { rows, count } = await Question.findAndCountAll()
    const randomQuestionIndex = randomInt(1, count);
    const questionToReturn = rows[randomQuestionIndex];

    const finalQuestion = `${PERSON_TO_ATTACK}, ${questionToReturn.question} ${await getRandomAdjective()}`;

    return finalQuestion;
  } catch (error) {
    console.trace(error);
    return "";
  }
}

module.exports = questions;
