const moment = require('moment');
moment.locale('id');
const { symptomOne, symptomTwo, symptomThree } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    symptomOne.findAll({
        // attributes: ['id','title','text','image','link', 'published']
    })
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Symptom Tidak Ditemukan",
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

exports.getDetailOne = (req, res) => {
    const { id } = req.query;
    symptomOne.findAll({ where: {id: id} })
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

exports.createOne = (req, res) => {
    const admin_id = req.userid;
    const { title, desc, published } = req.body;
    

    if(!req.file){
        res.status(200).send({
            code: 400,
            success: false,
            message: 'Icon harus ditambahkan.'
        });
        return;
    }

    const filename = req.file.filename;
    const input = {
        title: title,
        desc: desc,
        icon: filename,
        published: published,
        createdBy: admin_id,
    }

    symptomOne.create(input)
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
        console.log(err);
        res.status(200).send({
            code: 200,
            success: false,
            message: err || "Terjadi kesalahan saat simpan data."
        })
    })
}

exports.updateOne = (req, res) => {
    const { id } = req.query;
    const { title, desc, published } = req.body;

    if(req.file){
        const filename = req.file.filename;
        const update = {
            title: title,
            desc: desc,
            icon: filename,
            published: published,
        }
    
        symptomOne.update(update, {where: {id: id}})
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
    }else{
        const update = {
            title: title,
            desc: desc,
            // icon: filename,
            published: published,
        }
    
        symptomOne.update(update, {where: {id: id}})
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

/////////////////////////Symptom Detail

exports.getListDetail = (req, res) => {
    const {id} = req.query;
    symptomOne.findAll({
        where: {id: id},
        include: {
            model: symptomTwo,
            include: {
                model: symptomThree
            }
        }
    })
    .then(data=>{
        if(data.length != 0){
            res.status(200).send({
                code: 200,
                success: true,
                message: 'Data Ditemukan.',
                data: data
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
            message: err.message
        });
    });
}


/////////////////////////Symptom 2

exports.getDetailSymptom2 = (req, res) => {
    const { id } = req.query;

    symptomTwo.findAll({
        where: {id: id},
        include: {
            model: symptomOne
        }
    }).then(data=>{
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
    }).catch(err => {
        res.status(200).send({
            code: 200,
            success: false,
            message: err.message
        });
    });
}

exports.createTwo = (req, res) => {
    const { fid_symptom_one, title } = req.body;
    const insert = {
        fid_symptom_one: fid_symptom_one,
        title: title,
        // photo: req.file.filename,
        published: req.body.published,
    }

    symptomTwo.create(insert)
    .then(data=>{
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

exports.updateTwo = (req, res) => {
    const { id } = req.query;
    const { title } = req.body;
    const update = {
        title: title,
        // photo: req.file.filename,
        published: req.body.published,
    }

    symptomTwo.update(update, {where: {id: id}})
    .then(data=>{
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

/////////////////////////Symptom 3

exports.getDetailSymptom3 = (req, res) => {
    const { id } = req.query;

    symptomThree.findAll({
        where: {id: id},
        include: [
            {
                model: symptomTwo
            },
            {
                model: symptomOne
            },
        ]
    })
    .then(data=>{
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
            message: err.message
        });
    });
}

exports.createThree = (req, res) => {
    const { fid_symptom_one, fid_symptom_two, title } = req.body;

    
    const insert = {
        fid_symptom_one: fid_symptom_one,
        fid_symptom_two: fid_symptom_two,
        title: title,
        // photo: req.file.filename,
        published: req.body.published,
    }

    symptomTwo.create(insert)
    .then(data=>{
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


exports.updateThree = (req, res) => {
    const { id } = req.query;
    const { questions, actions, description, call_nurse, published } = req.body;

    if(req.file){
        const filename = req.file.filename;
        const update = {
            questions: questions,
            actions: actions,
            description: description,
            call_nurse: call_nurse,
            image: filename,
            published: published,
        }
    
        symptomThree.update(update, {where: {id: id}})
        .then(data=>{
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
        const update = {
            questions: questions,
            actions: actions,
            description: description,
            call_nurse: call_nurse,
            // photo: req.file.filename,
            published: published,
        }
    
        symptomThree.update(update, {where: {id: id}})
        .then(data=>{
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
