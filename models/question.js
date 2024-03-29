'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    signal: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: '?'
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};