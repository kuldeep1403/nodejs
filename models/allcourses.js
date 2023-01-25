"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ SubCourses }) {
      // define association here
      this.hasMany(SubCourses, {
        foreignKey: "descriptionId",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  AllCourses.init(
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
      enrolled: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a duration" },
          notEmpty: { msg: "Duration must not be empty" },
        },
      },
      youTubeLink: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a youtube link" },
          notEmpty: { msg: "youtube link must not be empty" },
        },
      },
      actualPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a actual price" },
          notEmpty: { msg: "actual price must not be empty" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a price" },
          notEmpty: { msg: "price  not be empty" },
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Course must have a description" },
          notEmpty: { msg: "descriptionmust not be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "allcourses",
      modelName: "AllCourses",
    }
  );
  return AllCourses;
};
