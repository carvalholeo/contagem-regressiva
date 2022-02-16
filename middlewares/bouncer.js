const bouncer = require('express-bouncer')(5000, 1800000, 3);

bouncer.whitelist.push('127.0.0.1', '::1'); // allow an IP address

// give a custom error message
bouncer.blocked = function (req, res, next, remaining) {
  const message = `Too many requests have been made. Please wait ${remaining/1000} seconds.`;
  return res
    .status(429)
    .send(message);
};

module.exports = bouncer;
