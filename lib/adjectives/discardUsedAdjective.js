const { UsedAdjectives } = require('../../models');

async function discardUsedAdjective(adjective) {
  await UsedAdjectives.create({ adjective: adjective.adjective });
}

module.exports = discardUsedAdjective;
