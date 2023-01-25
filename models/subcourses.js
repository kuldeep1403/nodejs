"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCoursesModel, AllCourses }) {
      // define association here
      this.hasMany(SubCoursesModel, {
        foreignKey: "subcourseId",
      });
      this.belongsTo(AllCourses, {
        foreignKey: "descriptionId",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  SubCourses.init(
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
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a duration" },
          notEmpty: { msg: "Duration must not be empty" },
        },
      },
      videosNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a videonumber" },
          notEmpty: { msg: "videonumber must not be empty" },
        },
      },
      subHeading: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a subheading" },
          notEmpty: { msg: "subheading must not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "subcourses",
      modelName: "SubCourses",
    }
  );
  return SubCourses;
};
