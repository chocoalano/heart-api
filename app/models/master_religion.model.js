module.exports = (sequelize, Sequelize) => {
  const Religion = sequelize.define("master_religion", {
    title: { type: Sequelize.STRING },
    published: { type: Sequelize.BOOLEAN },
    createdBy: { type: Sequelize.INTEGER },
  });
  return Religion;
};