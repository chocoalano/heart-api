module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/region.controller");
    var router = require("express").Router();

    router.get("/search", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.findAll);
    router.get("/data", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.findOne);
    app.use('/region', router);
};