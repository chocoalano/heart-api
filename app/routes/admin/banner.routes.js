module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/admin/banner.controller");
    var router = require("express").Router();

    var multer  = require('multer');
    var router = require("express").Router();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, 'D:/mnt/avatar')
        cb(null, process.env.MNT_PATH + 'banners')
      },
      filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1]
        cb(null, Date.now() + '.' + fileExtension)
        // cb(null, file.originalname)
      }
    })
    var upload = multer({ storage: storage })


    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getList);
    router.get("/detail", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getBannerDetail);
    router.post("/save", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.createBanner);
    router.put("/update", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.updateBanner);
    router.delete("/delete", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.delete);
    app.use('/admin/banner', router);
};