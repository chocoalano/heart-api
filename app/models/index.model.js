const dbConfig = require("../../configs/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    logging: false,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    useUTC: false,
    timestamps: false,
    //  ssl: true,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        timezone: "+07:00"
    },
    timezone: "+07:00"
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.admin = require("./admin.model")(sequelize, Sequelize);
db.banner = require("./banner.model")(sequelize, Sequelize);
db.articles = require("./articles.model")(sequelize, Sequelize);
db.userDrag = require("./user_drug.model")(sequelize, Sequelize);
db.officer = require("./officer.model")(sequelize, Sequelize);
db.symptomOne = require("./symptom_one.model")(sequelize, Sequelize);
db.symptomTwo = require("./symptom_two.model")(sequelize, Sequelize);
db.symptomThree = require("./symptom_three.model")(sequelize, Sequelize);
db.mstReligion = require("./master_religion.model")(sequelize, Sequelize);
db.regVillages = require("./reg_villages.model")(sequelize, Sequelize);
db.regDistrics = require("./reg_districts.model")(sequelize, Sequelize);
db.regRegencies = require("./reg_regencies.model")(sequelize, Sequelize);
db.regProvincies = require("./reg_provinces.model")(sequelize, Sequelize);
db.homeCare = require("./homecare.model")(sequelize, Sequelize);
db.historyCare = require("./historycare.model")(sequelize, Sequelize);
db.history = require("./history.model")(sequelize, Sequelize);

//Table Relation==========
//Table Relation==========
//Table Relation==========
db.regProvincies.hasMany(db.regRegencies, { foreignKey: "province_id" });
db.regRegencies.belongsTo(db.regProvincies, { foreignKey: "province_id" });
db.regRegencies.hasMany(db.regDistrics, { foreignKey: "regency_id" });
db.regDistrics.belongsTo(db.regRegencies, { foreignKey: "regency_id" });
db.regDistrics.hasMany(db.regVillages, { foreignKey: "district_id" });
db.regVillages.belongsTo(db.regDistrics, { foreignKey: "district_id" });

db.symptomOne.hasMany(db.symptomTwo, { foreignKey: "fid_symptom_one" });
db.symptomTwo.belongsTo(db.symptomOne, { foreignKey: "fid_symptom_one" });
db.symptomTwo.hasMany(db.symptomThree, { foreignKey: "fid_symptom_two" });
db.symptomThree.belongsTo(db.symptomTwo, { foreignKey: "fid_symptom_two" });
db.symptomOne.hasMany(db.symptomThree, { foreignKey: "fid_symptom_one" });
db.symptomThree.belongsTo(db.symptomOne, { foreignKey: "fid_symptom_one" });

// db.admin.hasMany(db.articles, { foreignKey: "createdBy" });
// db.articles.belongsTo(db.admin, { foreignKey: "createdBy" });
// db.admin.hasMany(db.banner, { foreignKey: "createdBy" });
// db.banner.belongsTo(db.admin, { foreignKey: "createdBy" });

db.user.hasMany(db.userDrag, { foreignKey: "fid_user" });
db.userDrag.belongsTo(db.user, { foreignKey: "fid_user" });
db.user.hasMany(db.homeCare, { foreignKey: "fid_user" });
db.homeCare.belongsTo(db.user, { foreignKey: "fid_user" });
db.user.hasMany(db.historyCare, { foreignKey: "fid_user" });
db.historyCare.belongsTo(db.user, { foreignKey: "fid_user" });
db.user.hasMany(db.history, { foreignKey: "fid_user" });
db.history.belongsTo(db.user, { foreignKey: "fid_user" });

module.exports = db;