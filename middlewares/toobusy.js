const toobusy = require('toobusy-js');

function toobusyMiddleware(req, res, next) {
  if (toobusy()) {
    const message = "Server Too Busy. Try again soon.";
    console.log(message);
    return res
      .status(503)
      .send(message);
  }
  next();
}

module.exports = toobusyMiddleware;
