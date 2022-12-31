const { ATTACK_MODE = 0 } = process.env;

const { dateMath: dateCalculator, dateMathNomination } = require('../dateMath');
const Generator = require('./Generator');
const questionsGenerator = require('./questions');


async function textGenerator() {
  const dateMath = dateCalculator();
  const generator = new Generator(dateMath);
  const generatorInauguration = new Generator(dateMathNomination());

    let questions = undefined;

    if(+ATTACK_MODE) {
      questions = await questionsGenerator();
    }

    const inauguration = await generatorInauguration
      .hours()
      .minutes();

    const inaugurationText = `${inauguration.string} para a posse de Lula.`;

  return {
    endGov: await generator
      .hours()
      .minutes()
      .predicate(),

    questions: questions,

    inauguration: inaugurationText,
  }
}

module.exports = textGenerator;