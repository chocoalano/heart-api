const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { homeCare } = require("../../models/index.model");
const { user } = require('pg/lib/defaults');

exports.getList = (req, res) => {
    const id = req.userid;

    homeCare.findAll({ 
        where: { fid_user: id }, 
        order: [ ['createdAt', 'DESC'] ] 
    }).then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Home Care Tidak Ditemukan",
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
    const { tekanan_darah, berat_badan, cairan_masuk, aktifitas_harian, makanan_harian } = req.body;

    // if ( !tekanan_darah && !berat_badan && !cairan_masuk && !aktifitas_harian && !makanan_harian ) {
    //     res.status(500).send({
    //         code: 500,
    //         success: false,
    //         message: "Form belum lengkap"
    //     });
    //     return;
    // }

    homeCare.create({ tekanan_darah, berat_badan, cairan_masuk, aktifitas_harian, makanan_harian, fid_user })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Daftar Aktifitas telah disimpan",
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

    homeCare.destroy({ where: { id: id, fid_user: fid_user }})
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
            message: "Daftar Aktifitas telah dihapus",
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