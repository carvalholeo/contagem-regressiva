require('dotenv').config({ path: './.env' });

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cron = require('node-cron');

const twitterBot = require('./bots/twitter');

const bouncer = require('./middlewares/bouncer');
const toobusyMiddleware = require('./middlewares/toobusy');

const timeGenerator = require('./lib/timeGenerator');

let time = timeGenerator();
let timeController = time;

console.log(`First schedule: ${time}`);

// deepcode ignore UseCsurfForExpress: Just receive GET requests, without create any resources at server by Express.
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(toobusyMiddleware);
app.use(bouncer.block);
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

let task = null;

const { CRON_MIN_INTERVAL = 9, CRON_TIME } = process.env;

if (CRON_TIME) {
  cron.schedule(`${+CRON_MIN_INTERVAL - 1 } * * * *`, () => {
    if (time !== timeController) {
      console.log('Restarting due timer has changed');
      task.stop();
      cronTask();
      timeController = time;
      return;
    }
  }, {
    timezone: 'America/Sao_Paulo',
  });
}

function cronTask() {
  task = cron.schedule(CRON_TIME || time, (datetime) => {
    twitterBot();
    console.info(`Twitter bot executed at ${datetime}`);
    time = timeGenerator();
    console.log(`Next schedule: ${time}`);
    return;
  }, {
    timezone: 'America/Sao_Paulo',
    scheduled: true
  });
}

cronTask();

module.exports = app;
