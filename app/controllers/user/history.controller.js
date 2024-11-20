const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { history } = require("../../models/index.model");
const { user } = require('pg/lib/defaults');

exports.getList = (req, res) => {
    const id = req.userid;

    history.findAll({ 
        where: { fid_user: id }, 
        order: [ ['createdAt', 'DESC'] ] 
    }).then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Riwayat Pemeriksaan Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Aktifitas Ditemukan",
            data: data
        });
        return;
    })
}

exports.save = (req, res) => {
    const fid_user = req.userid;
    const { date_check, tekanan_darah, gula_darah_sewaktu, gula_darah_puasa, gula_darah_dua_jam, hba1c, ldl, hdl, kolesterol, ureum, kretinin } = req.body;

    history.create({ date_check, tekanan_darah, gula_darah_sewaktu, gula_darah_puasa, gula_darah_dua_jam, hba1c, ldl, hdl, kolesterol, ureum, kretinin, fid_user })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Daftar Riwayat Pemeriksaan telah disimpan",
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

    history.destroy({ where: { id: id, fid_user: fid_user }})
    .then(data => {
        // console.log(data)
        if(data == 0){
            res.send({
                code: 200,
                success: true,
                message: "ID Aktivitas tidak ditemukan",
            });
            return;
        }
        res.send({
            code: 200,
            success: true,
            message: "Daftar Riwayat Pemeriksaan telah dihapus",
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