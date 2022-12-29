const { DateTime } = require('luxon');

function dateMath() {
  const initialDateTime = DateTime.now().setZone('America/Sao_Paulo');
  const finalDate = DateTime.fromISO('2023-01-01T00:00', {
    zone: 'America/Sao_Paulo'
  });

  return finalDate.diff(initialDateTime, ['hour', 'hours', 'minute', 'minutes', 'seconds']).toObject();
}

function dateMathNomination() {
  const initialDateTime = DateTime.now().setZone('America/Sao_Paulo');
  const finalDate = DateTime.fromISO('2023-01-01T14:00', {
    zone: 'America/Sao_Paulo'
  });

  return finalDate.diff(initialDateTime, ['hour', 'hours', 'minute', 'minutes', 'seconds']).toObject();
}

function dateMathPrison() {
  const initialDate = DateTime.fromISO('2023-01-01T14:00', {
    zone: 'America/Sao_Paulo'
  });
  const finalDate = DateTime.now().setZone('America/Sao_Paulo');

  return initialDate.diff(finalDate, ['days', 'day', 'hour', 'hours', 'minute', 'minutes', 'seconds']).toObject();
}

module.exports = {
  dateMath,
  dateMathNomination,
  dateMathPrison
};
