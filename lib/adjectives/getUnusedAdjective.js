const { Op } = require('sequelize');
const { Adjectives, UsedAdjectives } = require('../../models');

async function getUnusedAdjective() {
  const adjectivesDb = await UsedAdjectives.findAll({
    attributes: ['adjective'],
    raw: true,
  });

  const adjectives = adjectivesDb.map(adjective => adjective.adjective);

  const listFiltered = await Adjectives.findAll({
    where: {
      adjective: {
        [Op.notIn]: adjectives,
      }
    },
    raw: true,
    attributes: ['adjective'],
  });

  if (listFiltered.length === 0) {
    await UsedAdjectives.destroy({});
    return adjectives;
  }

  return listFiltered;
}

module.exports = getUnusedAdjective;
