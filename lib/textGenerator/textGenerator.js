const { dateMath: dateCalculator } = require('../dateMath');
const Generator = require('./Generator');


function textGenerator() {
  const dateMath = dateCalculator();
  const generator = new Generator(dateMath);

  return generator
    .months()
    .days()
    .hours()
    .minutes()
    .predicate();
}

module.exports = textGenerator;
