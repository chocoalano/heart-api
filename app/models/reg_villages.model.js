module.exports = (sequelize, Sequelize) => {
    const regVillages = sequelize.define("reg_villages", {
        district_id: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
    });
    return regVillages;
};