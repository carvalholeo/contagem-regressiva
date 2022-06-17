'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Adjectives', {
      fields: ['adjective'],
      type: 'UNIQUE',
      name: 'adjective_unique',
    });
    await queryInterface.addConstraint('UsedAdjectives', {
      fields: ['adjective'],
      type: 'unique',
      name: 'usedAdjective_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Adjectives', 'adjective_unique');
    await queryInterface.removeConstraint('UsedAdjectives', 'usedAdjective_unique');
  }
};
