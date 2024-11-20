const moment = require('moment');
moment.locale('id');

const { officer } = require("../../models/index.model");


exports.getList = (req, res) => {
    const id = req.userid;
    officer.findAll({
        // attributes: ['id','email','name','photo','gender','city', 'doctor_name', 'hospital_name']
        order: [ ['workAt', 'ASC'] ], 
    })
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data User Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data User Ditemukan",
            data: data
        });
        return;
    })
}

exports.getDetail = (req, res) => {
    const { id } = req.query;
    officer.findAll({
        where: { id: id },
    })
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data User Tidak Ditemukan",
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data User Ditemukan",
            data: data[0]
        });
        return;
    })
}

exports.create = (req, res) => {
    const createdBy = req.userid;
    const { name, phone, workAt } = req.body;
    const published = true;

    if(!req.file){
        res.status(500).send({
            code: 500,
            success: false,
            message: "Foto harus diisi"
        });
        return;
    }

    if ( !name && !workAt && !phone ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    const photo = req.file.filename;

    officer.create({ name, phone, workAt, photo, published, createdBy })
    .then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Data Petugas telah disimpan",
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

exports.update = (req, res) => {
    const createdBy = req.userid;
    const {id} = req.query;
    const { name, phone, workAt } = req.body;
    const published = true;

    if ( !name && !workAt && !phone ) {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Form belum lengkap"
        });
        return;
    }

    if(!req.file){
        officer.update({ name, phone, workAt, published, createdBy },{ where: {id: id} })
        .then(data => {
            res.send({
                code: 200,
                success: true,
                message: "Data Petugas telah disimpan",
            });
            return;
        }).catch(err => {
            res.status(500).send({
                code: 500,
                success: false,
                message: err.message || "Terjadi masalah pada server."
            });
        });
    } else {
        const photo = req.file.filename;
        officer.update({ name, phone, workAt, photo, published, createdBy },{ where: {id: id} })
        .then(data => {
            res.send({
                code: 200,
                success: true,
                message: "Data Petugas telah disimpan",
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

}


exports.delete = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;

    officer.destroy({ where: { id: id }})
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