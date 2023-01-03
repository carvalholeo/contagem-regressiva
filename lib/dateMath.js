const { DateTime } = require("luxon");

function dateMath() {
  const initialDate = DateTime.fromISO("2023-01-01T15:00", {
    zone: "America/Sao_Paulo",
  });
  const finalDate = DateTime.now().setZone("America/Sao_Paulo");

  return finalDate
    .diff(initialDate, [
      "days",
      "day",
      "hour",
      "hours",
      "minute",
      "minutes",
      "seconds",
    ])
    .toObject();
}

function dateMathPrison() {
  const initialDate = DateTime.fromISO("2023-01-01T15:00", {
    zone: "America/Sao_Paulo",
  });
  const finalDate = DateTime.now().setZone("America/Sao_Paulo");

  return finalDate
    .diff(initialDate, [
      "days",
      "day",
      "hour",
      "hours",
      "minute",
      "minutes",
      "seconds",
    ])
    .toObject();
}

module.exports = {
  dateMath,
  dateMathPrison,
};
