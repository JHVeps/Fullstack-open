const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Readlist extends Model {}

Readlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "readlist",
    tableName: "readlist", // Set the table name to "readlist"
  }
);

module.exports = Readlist;
