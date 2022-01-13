const { dateMath: dateCalculator } = require('./dateMath');
const { getRandomAdjective } = require('./adjectives');

function textGenerator() {
  const dateMath = dateCalculator();

  const vocabulary = {
    months: dateMath.months < 2 ? 'mês' : 'meses',
    days: dateMath.days < 2 ? 'dia' : 'dias',
    hours: dateMath.hours < 2 ? 'hora' : 'horas',
    minutes: dateMath.minutes < 2 ? 'minuto' : 'minutos',
    seconds: dateMath.seconds < 2 ? 'segundo' : 'segundos',
  };

  return `${dateMath.months < 2 ? 'Falta' : 'Faltam'} ${dateMath.months} ${vocabulary.months}, ${dateMath.days} ${vocabulary.days}, ${dateMath.hours} ${vocabulary.hours} e ${dateMath.minutes} ${vocabulary.minutes} para o fim do governo do ${getRandomAdjective()}.`;
}

module.exports = {
  textGenerator,
};