module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/admin/user.controller");
    var router = require("express").Router();

    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getList);
    router.get("/detail", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getDetail);
    app.use('/admin/user', router);
};