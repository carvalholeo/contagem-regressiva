const { ATTACK_MODE = 0 } = process.env;

const { dateMath: dateCalculator, dateMathElection } = require('../dateMath');
const Generator = require('./Generator');
const questionsGenerator = require('./questions');


async function textGenerator() {
  const dateMath = dateCalculator();
  const dataMathElectionObj = dateMathElection();
  const generator = new Generator(dateMath);
  const generatorSecondRound = new Generator(dataMathElectionObj);
  const secondRound = generatorSecondRound
    .days()
    .hours()
    .minutes()
    .firstRound();

    let questions = undefined;

    if(+ATTACK_MODE) {
      questions = await questionsGenerator();
    }

  return {
    endGov: await generator
      .days()
      .hours()
      .minutes()
      .predicate(),

    firstRound: secondRound,

    questions: questions,
  }
}

module.exports = textGenerator;