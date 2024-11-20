module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    },
  });
  return Admin;
};