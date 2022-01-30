const fs = require('fs');
const path = require('path');
const adjectives = require('./adjectives.json');
const usedAdjectives = require('./usedAdjectives.json');

function getUnusedAdjective() {
  const listFiltered = adjectives.filter(adjective => !usedAdjectives.includes(adjective));

  if (listFiltered.length === 0) {
    fs.writeFileSync(path.join(__dirname, 'usedAdjectives.json'), JSON.stringify([]), { flag: "w"});
    return adjectives;
  }

  return listFiltered;
}

module.exports = getUnusedAdjective;
