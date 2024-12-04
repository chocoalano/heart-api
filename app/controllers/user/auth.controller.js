const jwt = require('jsonwebtoken');
const md5 = require('md5');
const moment = require('moment');
const async = require('async')
const sequelize = require('sequelize');
const Op = sequelize.Op;
moment.locale('id');
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not
}

const { user } = require("../../models/index.model");

exports.login = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Silahkan masukkan Email dan Password Kamu!"
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    user.findAll({
        where: { email: email, password: md5(password) },
        attributes: ['id', 'email', 'name', 'gender', 'photo']
    }).then(data => {
        if (data.length === 0) {
            res.status(200).send({
                code: 200,
                status: false,
                message: 'Email atau Password Kamu salah/belum terdaftar, mohon masukkan kembali Kamu.',
            });
        } else {
            let userid = data[0].id;
            let dataToken = {
                userId: userid,
                password: password
            }
            const token = jwt.sign(dataToken, jwtSecretKey);
            const update = {
                token: token
            }
            user.update(update, { where: { id: userid } })
                .then(data2 => {
                    res.status(200).send({
                        code: 200,
                        success: true,
                        message: 'Login berhasil',
                        token: token,
                        data: data[0]
                    });
                })
        }
    })
}

exports.register = (req, res) => {
    const { email, password, name, gender, religion, birthday, published } = req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegexp.test(email)) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Format Email Anda Salah, silahkan perbaiki.",
        });
    }

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const input = {
        email: email,
        password: md5(password),
        name: name,
        gender: gender,
        religion: religion,
        birthday: moment(birthday).format(),
        published: published ? published : true
    };
    
    user.findAll({ where: { email: email } })
        .then(data => {
            if (data.length > 0) {
                res.status(400).send({
                    code: 400,
                    success: false,
                    message: "Email sudah terdaftar, silahkan gunakan email lainnya",
                });
            } else {
                user.create(input)
                    .then(data => {
                        let userid = data.id;
                        let dataToken = {
                            time: Date(),
                            userId: userid,
                        }
    
                        const token = jwt.sign(dataToken, jwtSecretKey);
                        const update = {
                            token: token
                        }
                        user.update(update, { where: { id: userid } })
                            .then(data2 => {
                                res.status(200).send({
                                    code: 200,
                                    success: true,
                                    message: "Akun berhasil dibuat.",
                                    token: token,
                                    data: data
                                })
                            })
    
                    }).catch(err => {
                        res.status(500).send({
                            code: 500,
                            success: false,
                            message: err || "Terjadi masalah pada saat membuat akun."
                        })
                    })
            }
        })
}

exports.checkEmail = (req, res) => {
    if (!req.body.email) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Silahkan masukkan Email Kamu!"
        });
    }

    user.findAll({ where: { email: req.body.email } })
        .then(data => {
            if (data.length == 0) {
                res.status(400).send({
                    code: 400,
                    success: false,
                    message: 'Data Kamu belum terdaftar. Email dapat digunakan.',
                    // data : ''
                });
            } else {
                res.status(200).send({
                    code: 200,
                    success: true,
                    message: 'Data Akun sudah terdaftar.',
                    // data : ''
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                success: false,
                message: err || "Terjadi masalah pada server."
            });
        });
}


exports.resetPass = (req, res) => {
    const { email, birthday, password, repassword } = req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!emailRegexp.test(email)) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Format Email Anda Salah, silahkan perbaiki.",
        });
    }

    if (!email) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Silahkan masukkan Email Anda!"
        });
        return;
    }

    if (!birthday) {
        res.status(400).send({
            code: 400,
            success: false,
            message: "Silahkan masukkan Tanggal Lahir Anda!"
        });
        return;
    }

    if (password !== repassword) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Password anda tidak sama dengan ulangi password"
        });
        return;
    }
    var condition = { title: sequelize.where(sequelize.fn('date', sequelize.col('birthday')), '=', birthday), email: email }

    user.findAll({ 
        where: condition
    }).then(data => {
            if (data.length == 0) {
                res.status(400).send({
                    code: 400,
                    success: false,
                    message: 'Data yang Anda masukkan tidak sesuai.',
                    // data : ''
                });
            } else {
                user.update({ password: md5(password) }, 
                    {where: { email: email }
                }).then(data => {
                        res.send({
                            code: 200,
                            success: true,
                            message: "Password berhasil diubah",
                            // data: data
                        });
                        return;
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                code: 500,
                success: false,
                message: err || "Terjadi masalah pada server."
            });
        });
}

