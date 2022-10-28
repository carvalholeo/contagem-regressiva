const {
  CRON_MIN_INTERVAL = 9,
  CRON_MAX_INTERVAL = 60
} = process.env;
const { randomInt } = require('crypto');

function timeGenerator() {
  const result = randomInt(+CRON_MIN_INTERVAL, +CRON_MAX_INTERVAL);
  return `*/${result} * * * *`;
}

module.exports = timeGenerator;
