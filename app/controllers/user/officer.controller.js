const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { officer } = require("../../models/index.model");

exports.findAll = (req, res) => {
    const id = req.userid;

    officer.findAll()
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
}