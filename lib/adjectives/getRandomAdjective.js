const getUnusedAdjective = require('./getUnusedAdjective.js');
const discardUsedAdjective = require('./discardUsedAdjective.js');

async function getRandomAdjective() {
  const adjectives = await getUnusedAdjective();
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  await discardUsedAdjective(adjective);
  return adjective.adjective;
}

module.exports = getRandomAdjective;
