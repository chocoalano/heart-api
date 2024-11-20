module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/articles.controller");
    var router = require("express").Router();

    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getList);
    router.get("/detail", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getDetail);
    app.use('/articles', router);
};