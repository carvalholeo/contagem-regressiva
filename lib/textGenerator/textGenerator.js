const { dateMath: dateCalculator, dateMathPrison } = require('../dateMath');
const Generator = require('./Generator');

function textGenerator() {
  const generatorSecrets = new Generator(dateCalculator());
  const generatorPrison = new Generator(dateMathPrison());

    const prison = generatorPrison
      .hours()
      .minutes()
      .prison();

    const secret = generatorSecrets
      .hours()
      .minutes()
      .secret();

  return {
    prison,
    secret
  }
}

module.exports = textGenerator;