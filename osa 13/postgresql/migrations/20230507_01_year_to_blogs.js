const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    const currentYear = new Date().getFullYear();

    await queryInterface.addColumn("blogs", "year", {
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
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
