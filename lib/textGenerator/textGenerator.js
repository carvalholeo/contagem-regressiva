const { dateMath: dateCalculator, dateMathElection } = require('../dateMath');
const Generator = require('./Generator');


async function textGenerator() {
  const dateMath = dateCalculator();
  const dataMathElectionObj = dateMathElection();
  const generator = new Generator(dateMath);
  const generatorSecondRound = new Generator(dataMathElectionObj);
  let secondRound = generatorSecondRound;


  return {
    endGov: await generator
      .days()
      .hours()
      .minutes()
      .predicate(),

    firstRound: secondRound,
  }
}

module.exports = textGenerator;