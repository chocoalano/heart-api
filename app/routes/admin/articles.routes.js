module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/admin/articles.controller");
    var router = require("express").Router();

    var multer  = require('multer');
    var router = require("express").Router();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, process.env.MNT_PATH + 'articles')
      },
      filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1]
        cb(null, Date.now() + '.' + fileExtension)
      }
    })
    var upload = multer({ storage: storage })

    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getList);
    router.get("/detail", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getDetail);
    router.post("/save", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.create);
    router.put("/update", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.update);
    router.delete("/delete", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.delete);
    app.use('/admin/articles', router);
};