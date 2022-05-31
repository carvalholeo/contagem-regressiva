'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsedAdjectives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsedAdjectives.init({
    adjective: DataTypes.STRING(100)
  }, {
    sequelize,
    modelName: 'UsedAdjectives',
  });
  return UsedAdjectives;
};