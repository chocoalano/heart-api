module.exports = app => {
    const authValidation = require("../../../configs/auth.config");
    const controller = require("../../controllers/admin/symptom.cotroller");
    var router = require("express").Router();

    var multer  = require('multer');
    var router = require("express").Router();
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // cb(null, 'D:/mnt/avatar')
        cb(null, process.env.MNT_PATH + 'symptoms')
      },
      filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')[1]
        cb(null, Date.now() + '.' + fileExtension)
        // cb(null, file.originalname)
      }
    })
    var upload = multer({ storage: storage })

    router.get("/one", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getList);
    router.post("/one", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('icon'), controller.createOne);
    router.get("/one/detail-edit", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getDetailOne);
    router.put("/one", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('icon'), controller.updateOne);
    router.get("/one/detail", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getListDetail);
    router.get("/two/detail-edit", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getDetailSymptom2);
    router.put("/two", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.updateTwo);
    router.get("/three/detail-edit", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.getDetailSymptom3);
    router.put("/three", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.updateThree);
    // router.put("/update", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, upload.single('image'), controller.update);
    // router.delete("/delete", authValidation.apiKeyValidation, authValidation.tokenAdminValidation, controller.delete);
    app.use('/admin/symptom', router);
};