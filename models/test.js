"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Test.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "tests",
      modelName: "Test",
    }
  );
  return Test;
};
