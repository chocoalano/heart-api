module.exports = (sequelize, Sequelize) => {
  const Officer = sequelize.define("officer", {
    phone: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    workAt: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    },
    createdBy: {
      type: Sequelize.INTEGER
    },
  });
  return Officer;
};