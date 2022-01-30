const fs = require('fs');
const path = require('path');

function discardUsedAdjective(adjective) {
  const usedAdjectives = fs.readFileSync(path.join(__dirname, 'usedAdjectives.json'), 'utf8');
  const usedAdjectivesArray = JSON.parse(usedAdjectives);
  usedAdjectivesArray.push(adjective);
  fs.writeFileSync(path.join(__dirname, 'usedAdjectives.json'), JSON.stringify(usedAdjectivesArray));
}

module.exports = discardUsedAdjective;
