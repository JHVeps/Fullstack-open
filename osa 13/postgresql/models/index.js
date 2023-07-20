// const { sequelize } = require("../util/db");
// const Blog = require("./blog");
// const User = require("./user");
// const ReadList = require("./readlist");
// const Session = require("./session");

// // Blog.sync();
// // User.sync();
// // Define the first association with the alias "Author"
// Blog.belongsTo(User, { as: "Adder", foreignKey: "userId" });
// User.hasMany(Blog, { foreignKey: "userId" });

// // Define the second association with the alias "Readers" and "Readings"
// Blog.belongsToMany(User, {
//   through: ReadList,
//   as: "Readers", // Use "Readers" alias here
//   foreignKey: "blogId",
// });
// User.belongsToMany(Blog, {
//   through: ReadList,
//   as: "Readings", // Use "Readings" alias here
//   foreignKey: "userId",
// });
// module.exports = {
//   Blog,
//   User,
//   ReadList,
//   Session,
// };

const { sequelize } = require("../util/db");
const Blog = require("./blog");
const User = require("./user");
const ReadList = require("./readlist");
const Session = require("./session");

// Blog.sync();
// User.sync();
// Define the first association with the alias "Adder"
Blog.belongsTo(User, { as: "Adder", foreignKey: "userId" });
User.hasMany(Blog, { foreignKey: "userId" });

// Define the second association with the alias "Readers" and "Readings"
Blog.belongsToMany(User, {
  through: ReadList,
  as: "Readers", // Use "Readers" alias here
  foreignKey: "blogId",
  onDelete: "CASCADE", // Add this line to set onDelete: "CASCADE"
});
User.belongsToMany(Blog, {
  through: ReadList,
  as: "Readings", // Use "Readings" alias here
  foreignKey: "userId",
  onDelete: "CASCADE", // Add this line to set onDelete: "CASCADE"
});

// Set onDelete: "CASCADE" for the associations in the ReadList model
ReadList.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
ReadList.belongsTo(Blog, { foreignKey: "blogId", onDelete: "CASCADE" });

module.exports = {
  Blog,
  User,
  ReadList,
  Session,
};
