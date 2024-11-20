module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("articles", {
    title: { type: Sequelize.STRING },
    text: { type: Sequelize.TEXT },
    image: { type: Sequelize.STRING },
    published: { type: Sequelize.BOOLEAN },
    createdBy: { type: Sequelize.INTEGER },
  });
  return News;
};