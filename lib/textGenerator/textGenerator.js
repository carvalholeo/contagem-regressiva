const { dateMath: dateCalculator, dateMathElection } = require('../dateMath');
const Generator = require('./Generator');


async function textGenerator() {
  const dateMath = dateCalculator();
  const generator = new Generator(dateMath);
  const generatorFirstRound = new Generator(dateMathElection());

  return {
    endGov: await generator
      .days()
      .hours()
      .minutes()
      .predicate(),

    firstRound: generatorFirstRound
      .days()
      .firstRound()
  }
}

module.exports = textGenerator;