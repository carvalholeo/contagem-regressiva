const { dateMath: dateCalculator } = require('../dateMath');
const Generator = require('./Generator');


async function textGenerator() {
  const dateMath = dateCalculator();
  const generator = new Generator(dateMath);

  return await generator
    .days()
    .hours()
    .minutes()
    .predicate();
}

module.exports = textGenerator;
