const { sequelize } = require("../util/db");
const Blog = require("./blog");
const User = require("./user");
const ReadList = require("./readlist");

// Blog.sync();
// User.sync();

// Define the first association with the alias "Author"
Blog.belongsTo(User, { as: "Adder", foreignKey: "userId" });
User.hasMany(Blog, { foreignKey: "userId" });

// Blog.sync({ alter: true });
// User.sync({ alter: true });

// Define the second association with the alias "Readers" and "Readings"
Blog.belongsToMany(User, {
  through: ReadList,
  as: "Readers", // Use "Readers" alias here
  foreignKey: "blogId",
});
User.belongsToMany(Blog, {
  through: ReadList,
  as: "Readings", // Use "Readings" alias here
  foreignKey: "userId",
});

module.exports = {
  Blog,
  User,
  ReadList,
};
