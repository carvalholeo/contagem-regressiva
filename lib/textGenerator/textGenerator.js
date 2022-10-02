const { dateMath: dateCalculator, dateMathElection } = require('../dateMath');
const Generator = require('./Generator');


async function textGenerator() {
  const dateMath = dateCalculator();
  const dataMathElectionObj = dateMathElection();
  const generator = new Generator(dateMath);
  const generatorFirstRound = new Generator(dataMathElectionObj);
  let firstRound = generatorFirstRound
    .days()
    .hours()
    .minutes()
    .firstRound();


  return {
    endGov: await generator
      .days()
      .hours()
      .minutes()
      .predicate(),

    firstRound,
  }
}

module.exports = textGenerator;