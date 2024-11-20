module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define("banner", {
        title: { type: Sequelize.STRING },
        text: { type: Sequelize.TEXT },
        image: { type: Sequelize.STRING },
        link: { type: Sequelize.STRING },
        published: { type: Sequelize.BOOLEAN },
        createdBy: { type: Sequelize.INTEGER },
    });
    return Banner;
};