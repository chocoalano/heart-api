module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/history_care.controller");
    var router = require("express").Router();

    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getList);
    router.post("/save", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.save);
    router.delete("/delete", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.delete);
    app.use('/history-care', router);
};