module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/officer.controller");
    var router = require("express").Router();


    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.findAll);
    app.use('/officer', router);
};