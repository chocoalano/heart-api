const moment = require('moment');
moment.locale('id');

const { user, userDrag, historyCare, homeCare, history } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    user.findAll({
        attributes: ['id','email','name','photo','gender','city', 'doctor_name', 'hospital_name', 'first_diagnosa']
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
    const { userid } = req.query;
    user.findAll({
        where: { id: userid },
        attributes: ['id','email','name','photo','gender','city','religion', 'birthday', 'address', 'district', 'city', 'province', 'doctor_name', 'hospital_name', 'first_diagnosa', 'hipertensi', 'diabetes', 'hiperkolesterol', 'kelainanjantungbawaan', 'lain'],
        include: [
            { model: userDrag},
            { model: historyCare},
            { model: homeCare},
            { model: history},
        ]
        
    }).then(data => {
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