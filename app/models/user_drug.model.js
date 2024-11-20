module.exports = (sequelize, Sequelize) => {
  const userDrug = sequelize.define("user_drug", {
    time: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    instruction: {
      type: Sequelize.TEXT
    },
    published: {
      type: Sequelize.BOOLEAN
    },
  });
  return userDrug;
};