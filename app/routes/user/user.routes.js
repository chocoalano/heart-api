module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/user/user.controller");
    var router = require("express").Router();

    var multer  = require('multer');
    var router = require("express").Router();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, 'D:/mnt/avatar')
        cb(null, process.env.MNT_PATH + 'users')
      },
      filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1]
        cb(null, Date.now() + '.' + fileExtension)
        // cb(null, file.originalname)
      }
    })
    var upload = multer({ storage: storage })

    router.get("/profile", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.findOne);
    router.put("/change-password", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.changePassword);
    router.put("/change-photo", authValidation.apiKeyValidation, authValidation.tokenValidation, upload.single('photo'), controller.changePhoto);
    router.put("/update-profile", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.updateProfile);
    router.put("/update-riwayat", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.healthHistory);
    router.put("/update-address", authValidation.apiKeyValidation, authValidation.tokenValidation, controller.updateAddress);
    app.use('/user', router);
};