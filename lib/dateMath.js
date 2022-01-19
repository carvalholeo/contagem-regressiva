const { DateTime } = require('luxon');

function dateMath() {
  const initialDateTime = DateTime.now().setZone('America/Sao_Paulo');
  const finalDate = DateTime.fromISO('2023-01-01T14:00', {
    zone: 'America/Sao_Paulo'
  });

  return finalDate.diff(initialDateTime, ['months', 'days', 'day', 'month', 'hour', 'hours', 'minute', 'minutes', 'seconds']).toObject();
}

module.exports = {
  dateMath,
};
