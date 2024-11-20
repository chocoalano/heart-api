module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/admin/auth.controller");
    var router = require("express").Router();

    // router.post("/auth/check/email", controller.checkEmail);
    router.post("/login", authValidation.apiKeyValidation, controller.login);
    router.post("/register", authValidation.apiKeyValidation, controller.register);
    app.use('/admin/auth', router);
};