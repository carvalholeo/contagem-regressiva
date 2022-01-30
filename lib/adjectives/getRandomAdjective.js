const getUnusedAdjective = require('./getUnusedAdjective.js');
const discardUsedAdjective = require('./discardUsedAdjective.js');

function getRandomAdjective() {
  const adjectives = getUnusedAdjective();
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  discardUsedAdjective(adjective);
  return adjective;
}

module.exports = getRandomAdjective;
