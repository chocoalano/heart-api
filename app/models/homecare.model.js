module.exports = (sequelize, Sequelize) => {
    const HomeCare = sequelize.define("homecare", {
        tekanan_darah: { type: Sequelize.STRING },
        berat_badan: { type: Sequelize.STRING },
        cairan_masuk: { type: Sequelize.STRING },
        aktifitas_harian: { type: Sequelize.STRING },
        makanan_harian: { type: Sequelize.STRING },
    });
    return HomeCare;
};