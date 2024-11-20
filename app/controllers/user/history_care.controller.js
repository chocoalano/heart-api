const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { historyCare } = require("../../models/index.model");
const { user } = require('pg/lib/defaults');

exports.getList = (req, res) => {
    const id = req.userid;

    historyCare.findAll({ 
        where: { fid_user: id }, 
        order: [ ['history_date', 'DESC'] ] 
    }).then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Riwayat Perawatan Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Riwayat Perawatan Ditemukan",
            data: data
        });
        return;
    })
}

exports.save = (req, res) => {
    const fid_user = req.userid;
    const { history_date, hospital_name, doctor_name, result } = req.body;

    if ( !history_date && !result ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    historyCare.create({ history_date, hospital_name, doctor_name, result, fid_user })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Riwayat Perawatan telah disimpan",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: err.message || "Terjadi masalah pada server."
        });
    });
}

exports.delete = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;

    historyCare.destroy({ where: { id: id, fid_user: fid_user }})
    .then(data => {
        // console.log(data)
        if(data == 0){
            res.send({
                code: 200,
                success: true,
                message: "ID History tidak ditemukan",
            });
            return;
        }
        res.send({
            code: 200,
            success: true,
            message: "Riwayat Perawatan telah dihapus",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: err.message || "Terjadi masalah pada server."
        });
    });
  
  
}