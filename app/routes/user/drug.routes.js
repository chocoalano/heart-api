module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/drug.controller");
    var router = require("express").Router();

    var multer  = require('multer');
    var router = require("express").Router();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, 'D:/mnt/avatar')
        cb(null, process.env.MNT_PATH + 'drugs')
      },
      filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1]
        cb(null, Date.now() + '.' + fileExtension)
        // cb(null, file.originalname)
      }
    })
    var upload = multer({ storage: storage })


    router.get("/list-time", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getListTime);
    router.get("/list", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.getList);
    router.post("/", authValidation.apiKeyValidation, authValidation.tokenValidation, upload.single('image'), controller.saveDrug);
    router.delete("/", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.deleteDrug);
    app.use('/drug', router);
};