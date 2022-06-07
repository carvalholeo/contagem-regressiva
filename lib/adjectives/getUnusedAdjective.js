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
    try {
      await UsedAdjectives.destroy({
        where: {},
        truncate: true
      });
    } catch (error) {
      await UsedAdjectives.truncate();
    } finally {
      return adjectives;
    }
  }

  return listFiltered;
}

module.exports = getUnusedAdjective;
