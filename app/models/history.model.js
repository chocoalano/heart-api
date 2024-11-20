module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("history", {
        date_check: { type: Sequelize.DATE },
        tekanan_darah: { type: Sequelize.STRING },
        gula_darah_sewaktu: { type: Sequelize.STRING },
        gula_darah_puasa: { type: Sequelize.STRING },
        gula_darah_dua_jam: { type: Sequelize.STRING },
        hba1c: { type: Sequelize.STRING },
        ldl: { type: Sequelize.STRING },
        hdl: { type: Sequelize.STRING },
        kolesterol: { type: Sequelize.STRING },
        ureum: { type: Sequelize.STRING },
        kretinin: { type: Sequelize.STRING },
    });
    return History;
};