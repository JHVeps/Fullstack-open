module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("blogs", "isRead", "is_read");
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn("blogs", "is_read", "isRead");
  },
};
