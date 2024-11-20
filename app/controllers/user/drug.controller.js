const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { userDrag } = require("../../models/index.model");
const { user } = require('pg/lib/defaults');

exports.getListTime = (req, res) => {
    const id = req.userid;
    userDrag.findAll({
        where: {fid_user: id},
        order: [ ['time', 'ASC'] ], 
        attributes: [sequelize.fn('DISTINCT', sequelize.col('time')), 'time'],
        // include: {
        //     model: userDrag,
        //     // group: ["Table.column1"]
        // }
    })
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Obat Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Obat Ditemukan",
            data: data
        });
        return;
    })
}

exports.getList = (req, res) => {
    const id = req.userid;
    const { time } = req.query;

    userDrag.findAll({ 
        where: { published: true, fid_user: id, time: time }, 
        order: [ ['time', 'ASC'] ], 
        attributes: ['id', 'time', 'title', 'instruction'],
    })

    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Obat Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Obat Ditemukan",
            data: data
        });
        return;
    })
}

exports.saveDrug = (req, res) => {
    const fid_user = req.userid;
    const { time, title, instruction } = req.body;
    const published = true;

    if ( !time && !title && !instruction ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    userDrag.create({ time, title, instruction, published, fid_user })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Daftar Obat telah disimpan",
        });
        return;
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: err.message || "Terjadi masalah pada server."
        });
    });


    // if(!req.file){
    //     userDrag.create({ time, title, instruction, published, fid_user })
    //     .then(data => {
    //         res.send({
    //             code: 200,
    //             success: true,
    //             message: "Daftar Obat telah disimpan",
    //         });
    //         return;
    //     }).catch(err => {
    //         res.status(500).send({
    //             code: 500,
    //             success: false,
    //             message: err.message || "Terjadi masalah pada server."
    //         });
    //     });
    // } else {
    //     const image = req.file.filename;
    //     // console.log(image);
    //     userDrag.create({ title, instruction, image, published, fid_user })
    //     .then(data => {
    //         res.send({
    //             code: 200,
    //             success: true,
    //             message: "Daftar Obat telah disimpan",
    //         });
    //         return;
    //     }).catch(err => {
    //         res.status(500).send({
    //             code: 500,
    //             success: false,
    //             message: err.message || "Terjadi masalah pada server."
    //         });
    //     });
    // }
    
    
}
    

exports.deleteDrug = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;

    userDrag.destroy({ where: { id: id, fid_user: fid_user }})
    .then(data => {
        // console.log(data)
        if(data == 0){
            res.send({
                code: 200,
                success: true,
                message: "ID Obat tidak ditemukan",
            });
            return;
        }
        res.send({
            code: 200,
            success: true,
            message: "Daftar Obat telah dihapus",
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