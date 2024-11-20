module.exports = (sequelize, Sequelize) => {
    const SymptomOne = sequelize.define("symptom_one", {
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
    });
    return SymptomOne;
};