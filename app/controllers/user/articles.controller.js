const moment = require('moment');
moment.locale('id');

const { articles } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    articles.findAll({where: {published: true}})
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Obat Tidak Ditemukan",
                // data: data
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

exports.getDetail = (req, res) => {
    const { articleID } = req.query;
    articles.findAll({where: {published: true, id: articleID}})
    .then(data => {
        if(data.length == 0){
            res.send({
                code: 400,
                success: false,
                message: "Data Obat Tidak Ditemukan",
                // data: data[0]
            });
            return;
        }

        res.send({
            code: 200,
            success: true,
            message: "Data Obat Ditemukan",
            data: data[0]
        });
        return;
    })
}

