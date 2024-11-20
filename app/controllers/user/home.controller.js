const moment = require('moment');
moment.locale('id');
const async = require('async')

const { banner, symptomOne, symptomTwo, symptomThree, articles } = require("../../models/index.model");

exports.getData = (req, res) => {
    const id = req.userid;

    async.parallel({
        dataBanners: function (callback) {
            banner.findAll({ where: { published: true } })
                .then(data => callback(null, data))
        },
        dataSymptomOne: function (callback) {
            symptomOne.findAll({ where: { published: true } })
                .then(data => callback(null, data))
        },
        dataArticles: function (callback) {
            articles.findAll({ where: { published: true}, limit: 5 })
                .then(data => callback(null, data))
        },

    }, function (err, results) {
        if (err === 'null') {
            res.status(400).send({
                code: 400,
                success: false,
                message: err.message,
            })
            return;
        }

        res.status(200).send({
            code: 200,
            success: true,
            message: 'Data Found',
            data: {
                data_banner: results.dataBanners,
                data_symptom: results.dataSymptomOne,
                data_articles: results.dataArticles,
            }
        })
        return;
    });

}

exports.getDataSymptom2 = (req, res) => {
    const id = req.userid;
    const { symptomOneID } = req.query;

    symptomTwo.findAll({
        where: { fid_symptom_one: symptomOneID },
    }).then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Data ditemukan",
            data: data
        });
        return;
    })
}

exports.getDataSymptom3 = (req, res) => {
    const id = req.userid;
    const { symptomTwoID } = req.query;

    symptomThree.findAll({
        where: { fid_symptom_two: symptomTwoID },
    }).then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Data ditemukan",
            data: data
        });
        return;
    })
}

exports.getResult = (req, res) => {
    const id = req.userid;
    const { symptomThreeID } = req.query;

    symptomThree.findAll({
        where: { id: symptomThreeID },
        include: [
            {
                model: symptomOne,
            },
            {
                model: symptomTwo
            }
        ]
    }).then(data => {
        res.send({
            code: 200,
            success: true,
            message: "Data ditemukan",
            data: data[0]
        });
        return;
    })
}