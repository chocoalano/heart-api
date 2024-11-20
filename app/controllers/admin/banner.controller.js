const moment = require('moment');
moment.locale('id');
const { banner } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    banner.findAll({
        attributes: ['id','title','text','image','link', 'published']
    })
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
            message: "Data Banner Ditemukan",
            data: data
        });
        return;
    })
}

exports.getBannerDetail = (req, res) => {
    const { id } = req.query;
    banner.findAll({ where: {id: id} })
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

exports.createBanner = (req, res) => {
    const id = req.userid;
    const { title, published} = req.body;

    if(!req.file){
        res.status(400).send({
            code: 400,
            success: false,
            message: 'Silahkan pilih gambar.'
        });
        return;
    }

    // console.log(req.body);
    // console.log(req.file.filename);
    const input = {
        title: title,
        // text: req.body.text,
        image: req.file.filename,
        published: published,
        createdBy: id,
    }

    banner.create(input)
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

exports.updateBanner = (req, res) => {
    const { id } = req.query;
    const { title, published } = req.body;

    console.log(req.body);
    if(!req.file){
        const update = {
            title: title,
            // text: req.body.description,
            // image: req.file.filename,
            published: published,
        }
    
        banner.update(update, {where: {id: id}})
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
                message: err || "Terjadi kesalahan saat edit data."
            })
        })
    } else {
        const image = req.file.filename;
        const update = {
            title: title,
            // text: req.body.description,
            image: filename,
            published: published,
        }
    
        banner.update(update, {where: {id: req.params.id}})
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
                message: err || "Terjadi kesalahan saat edit data."
            })
        })
    }  
} 
    

exports.delete = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;
    banner.destroy({ where: { id: id }})
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


