module.exports = (sequelize, Sequelize) => {
    const SymptomThree = sequelize.define("symptom_three", {
      fid_symptom_one: {
        type: Sequelize.INTEGER
      },
      fid_symptom_two: {
        type: Sequelize.INTEGER
      },
      questions: {
        type: Sequelize.STRING
      },
      actions: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      call_nurse: {
        type: Sequelize.BOOLEAN
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
    });
    return SymptomThree;
};