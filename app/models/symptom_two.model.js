module.exports = (sequelize, Sequelize) => {
    const SymptomTwo = sequelize.define("symptom_two", {
      fid_symptom_one: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
    });
    return SymptomTwo;
};