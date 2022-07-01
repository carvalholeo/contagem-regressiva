'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hashtag.init({
    hashtag: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Hashtag',
    timestamps: false,
  });
  return Hashtag;
};