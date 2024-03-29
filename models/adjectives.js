'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adjectives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adjectives.init({
    adjective: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'Adjectives',
  });
  return Adjectives;
};