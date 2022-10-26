const {
  CRON_MIN_INTERVAL = 9,
  CRON_MAX_INTERVAL = 60
} = process.env;

function timeGenerator() {
  const min = Math.ceil(+CRON_MIN_INTERVAL);
  const max = Math.floor(+CRON_MAX_INTERVAL);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return `*/${result} * * * *`;
}

module.exports = timeGenerator;
