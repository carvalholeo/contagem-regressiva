const { dateMath: dateCalculator, dateMathElection } = require('../dateMath');
const Generator = require('./Generator');


async function textGenerator() {
  const dateMath = dateCalculator();
  const dataMathElectionObj = dateMathElection();
  const generator = new Generator(dateMath);
  const generatorFirstRound = new Generator();
  let firstRound = '';

  if(dataMathElectionObj.minutes >= 1) {
    generatorFirstRound
        .days()
        .hours()
        .minutes()
        .firstRound()
  } else {
    firstRound = 'O PRIMEIRO TURNO ESTÁ ENCERRADO!'
  }


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