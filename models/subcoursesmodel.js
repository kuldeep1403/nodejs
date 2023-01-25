"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCoursesModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCourses }) {
      // define association here
      this.belongsTo(SubCourses, {
        foreignKey: "subcourseId"
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, subcourseId: undefined };
    }
  }
  SubCoursesModel.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a duration" },
          notEmpty: { msg: "Duration must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "subcoursesmodel",
      modelName: "SubCoursesModel",
    }
  );
  return SubCoursesModel;
};
