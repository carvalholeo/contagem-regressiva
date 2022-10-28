const { randomInt } = require("crypto");
const { getRandomAdjective } = require("../adjectives");
const { Question, Interjection } = require("../../models");

const { PERSON_TO_ATTACK } = process.env;

async function questions() {
  try {
    const { rows: allQuestions, count: questionsQty } = await Question.findAndCountAll();
    const { rows: allInterjections, count: interjetctionsQty } = await Interjection.findAndCountAll();

    const randomQuestionIndex = randomInt(1, questionsQty) - 1;
    const randomInterjectionIndex = randomInt(1, interjetctionsQty) - 1;

    const questionToReturn = allQuestions[randomQuestionIndex];
    const interjectionToReturn = allInterjections[randomInterjectionIndex];

    const finalQuestion = `${interjectionToReturn.text} ${PERSON_TO_ATTACK}, ${questionToReturn.question} ${await getRandomAdjective()}${questionToReturn.signal}`;

    return finalQuestion;
  } catch (error) {
    console.trace(error);
    return "";
  }
}

module.exports = questions;
