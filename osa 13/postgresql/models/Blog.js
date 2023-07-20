const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

const currentYear = new Date().getFullYear();

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1991,
          msg: "Year must be greater than or equal to 1991",
        },
        max: {
          args: currentYear,
          msg: `Year must be less than or equal to ${currentYear}`,
        },
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

module.exports = Blog;
