const moment = require('moment');
moment.locale('id');
const { articles } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    articles.findAll({
        attributes: ['id', 'image', 'title','text', 'published']
    }).then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Banner Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Banner Ditemukan",
            data: data
        });
        return;
    })
}

exports.getDetail = (req, res) => {
    const { id } = req.query;
    articles.findAll({ where: {id: id} })
    .then(data => {
        if(data.length != 0){
            res.status(200).send({
                code: 200,
                success: true,
                message: 'Data Ditemukan.',
                data: data[0]
            });
        }else{
            res.status(200).send({
                code: 200,
                success: false,
                message: 'Data Tidak Ditemukan.',
                data: data
            });
        }
    })
    .catch(err => {
        res.status(200).send({
            code: 200,
            success: false,
            message: err.message || "Terjadi masalah pada server."
        });
    });
}

exports.create = (req, res) => {
    const id = req.userid;
    const { title, text, published} = req.body;

    if(!req.file){
        res.status(400).send({
            code: 400,
            success: false,
            message: 'Silahkan pilih gambar.'
        })
        return;
    }

    // console.log(req.body);
    // console.log(req.file.filename);
    const input = {
        title: title,
        text: text,
        image: req.file.filename,
        published: published,
        createdBy: id,
    }

    articles.create(input)
    .then(data=>{
        // console.log(data);
        res.status(200).send({
            code: 200,
            success: true,
            message: 'Data berhasil disimpan.'
        })
    })
    .catch(err=>{
        // console.log(err);
        res.status(200).send({
            code: 200,
            success: false,
            message: err || "Terjadi kesalahan saat simpan data."
        })
    })
}

exports.update = (req, res) => {
    const {id} = req.query;
    const { title, text, published } = req.body;
    // console.log(req.body);
    if(!req.file){
        const update = {
            title: title,
            text: text,
            // image: req.file.filename,
            published: published,
        }
    
        articles.update(update, {where: {id: id}})
        .then(data=>{
            // console.log(data);
            res.status(200).send({
                code: 200,
                success: true,
                message: 'Data berhasil disimpan.'
            })
            return;
        })
        .catch(err=>{
            // console.log(err);
            res.status(200).send({
                code: 200,
                success: false,
                message: err || "Terjadi kesalahan saat edit data."
            })
        })
    } else {
        const update = {
            title: title,
            text: text,
            image: req.file.filename,
            published: published,
        }
    
        articles.update(update, {where: {id: id}})
        .then(data=>{
            // console.log(data);
            res.status(200).send({
                code: 200,
                success: true,
                message: 'Data berhasil disimpan.'
            })
            return;
        })
        .catch(err=>{
            // console.log(err);
            res.status(500).send({
                code: 500,
                success: false,
                message: err.message || "Terjadi kesalahan saat edit data."
            })
        })
    }
}

exports.delete = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;
    articles.destroy({ where: { id: id }})
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Banner Tidak Ditemukan",
                data: data
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Banner telah dihapus",
            data: data
        });
        return;
    })
}