const moment = require('moment');
moment.locale('id');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');

const { regDistrics, regRegencies, regProvincies } = require("../../models/index.model");

exports.findOne = (req, res) => {
    const id = req.userid;
    const { regencyID } = req.query;
    regDistrics.findAll({
        where: { id: regencyID },
        include: {
            model: regRegencies,
            include: {
                model: regProvincies
            }
        }
    }).then(data => {
        if (data) {
            res.send({
                code: 200,
                success: true,
                message: "Data berhasil diambil",
                data: data
            });
            return;
        } else {
            res.status(404).send({
                code: 404,
                success: false,
                message: `Cannot find user with id=${id}.`
            });
            return;
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
};

exports.findAll = (req, res) => {
    const id = req.userid;
    const { value } = req.query;
    if(value){
        const lookupValue = value.toLowerCase();
        var condition = { name: sequelize.where(sequelize.fn('LOWER', sequelize.col('reg_districts.name')), 'LIKE', '%' + lookupValue + '%')  }
    } else {
        null
    }
    regDistrics.findAll({
        where: condition,
        attributes: ['id', 'name'],
        include: {
            model: regRegencies,
            attributes: ['id', 'name'],
            include: {
                model: regProvincies,
                attributes: ['id', 'name'],
            }
        }
    }).then(data => {
        if (data) {
            res.send({
                code: 200,
                success: true,
                message: "Data berhasil diambil",
                data: data
            });
            return;
        } else {
            res.status(404).send({
                code: 404,
                success: false,
                message: `Cannot find user with id=${id}.`
            });
            return;
        }
    }).catch(err => {
        res.status(500).send({
            code: 500,
            success: false,
            message: "Error retrieving user with id=" + id
        });
        return;
    });
};