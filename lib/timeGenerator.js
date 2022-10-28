const {
  CRON_MIN_INTERVAL = 9,
  CRON_MAX_INTERVAL = 60,
  ATTACK_MODE = 0,
  CRON_TIME
} = process.env;
const { randomInt } = require('crypto');

function timeGenerator() {
  if (+ATTACK_MODE && !CRON_TIME) {
    const newCron = '*/5 * * * *';
    process.env['CRON_TIME'] = newCron;
    return newCron;
  }

  const result = randomInt(+CRON_MIN_INTERVAL, +CRON_MAX_INTERVAL);
  return `*/${result} * * * *`;
}

module.exports = timeGenerator;
