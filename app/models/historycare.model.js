module.exports = (sequelize, Sequelize) => {
    const HistoryCare = sequelize.define("historycare", {
        history_date: { type: Sequelize.DATE },
        hospital_name: { type: Sequelize.STRING },
        doctor_name: { type: Sequelize.STRING },
        result: { type: Sequelize.TEXT },
    });
    return HistoryCare;
};