module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("blogs", "userId", "user_id");
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("blogs", "user_id", "userId");
  },
};
