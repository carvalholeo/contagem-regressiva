const { ATTACK_MODE = 0 } = process.env;

const { dateMath: dateCalculator } = require('../dateMath');
const Generator = require('./Generator');
const questionsGenerator = require('./questions');


async function textGenerator() {
  const dateMath = dateCalculator();
  const generator = new Generator(dateMath);

    let questions = undefined;

    if(+ATTACK_MODE) {
      questions = await questionsGenerator();
    }

  return {
    endGov: await generator
      .hours()
      .minutes()
      .predicate(),

    questions: questions,
  }
}

module.exports = textGenerator;