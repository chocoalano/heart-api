const moment = require('moment');
moment.locale('id');
const md5 = require('md5');

const { user } = require("../../models/index.model");

exports.findOne = (req, res) => {
    const id = req.userid;
    user.findByPk(id)
    .then(data => {
        if (data) {
            res.send({
                code: 200,
                success: true,
                message: "Data berhasil diambil",
                data: data
            });
            return;
        } else {
            res.status(404).send({
                code: 404,
                success: false,
                message: `Cannot find user with id=${id}.`
            });
            return;
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
};

exports.changePassword = (req, res) => {
    const id = req.userid;
    const { password, repassword } = req.body;

    if (password !== repassword) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Password anda tidak sama dengan ulangi password"
        });
        return;
    }

    user.findByPk(id)
    .then(data => {
        if (data) {
            user.update({ password: md5(password) }, {where: { id: id }})
            .then(data => {
                res.send({
                    code: 200,
                    success: true,
                    message: "Password berhasil diubah",
                    // data: data
                });
                return;
            })
        } else {
            res.status(404).send({
                code: 404,
                success: false,
                message: `Cannot find user with id=${id}.`
            });
            return;
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
}

exports.updateProfile = (req, res) => {
    const id = req.userid;
    const { birthday, parent_name, name, gender, religion, doctor_name, hospital_name } = req.body;

    if ( !birthday && !parent_name && !name && !gender && !religion ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    user.update({ birthday, parent_name, name, gender, religion, doctor_name, hospital_name }, { where: {id: id} })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Profile telah diubah",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
}

exports.healthHistory = (req, res) => {
    const id = req.userid;
    const { first_diagnosa, hipertensi, diabetes, hiperkolesterol, kelainanjantungbawaan, lain } = req.body;

    user.update({ first_diagnosa, hipertensi, diabetes, hiperkolesterol, kelainanjantungbawaan, lain }, { where: {id: id} })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Riwayat Penyakit telah diubah",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
}

exports.changePhoto = (req, res) => {
    const id = req.userid;
    if(!req.file){
        res.status(500).send({
            code: 500,
            success: false,
            message: "Photo tidak sesuai"
        });
        return;
    }
    const fileName = req.file.filename;
    user.update({ photo: fileName }, { where: {id: id} })
    .then(data => {
        if(data === 0){
            res.send({
                code: 400,
                success: true,
                message: "User tidak ditemukan",
            });
            return;
        }
        res.send({
            code: 200,
            success: true,
            message: "Foto profil telah diubah",
            data: fileName
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
}

exports.updateAddress = (req, res) => {
    const id = req.userid;
    const { address, district, city, province } = req.body;

    if ( !address && !district && !city && !province ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    user.update({ address, district, city, province }, { where: {id: id} })
    .then(data => {
        if(data === 0){
            res.send({
                code: 400,
                success: true,
                message: "User tidak ditemukan",
            });
            return;
        }
        res.send({
            code: 200,
            success: true,
            message: "Alamat telah diubah",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
}