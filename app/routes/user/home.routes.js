module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/home.controller");
    var router = require("express").Router();

    router.get("/data", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getData);
    router.get("/symptom2", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getDataSymptom2);
    router.get("/symptom3", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getDataSymptom3);
    router.get("/result", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getResult);
    app.use('/home', router);
};