const moment = require('moment');
moment.locale('id');
const { articles } = require("../../models/index.model");

exports.getList = (req, res) => {
    const id = req.userid;
    articles.findAll({
        attributes: ['id', 'image', 'title', 'text', 'published']
    }).then(data => {
        if (data.length == 0) {
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
    articles.findAll({ where: { id: id } })
        .then(data => {
            if (data.length != 0) {
                res.status(200).send({
                    code: 200,
                    success: true,
                    message: 'Data Ditemukan.',
                    data: data[0]
                });
            } else {
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

exports.create = async (req, res) => {
    try {
        const userId = req.userid;
        const { title, text, published } = req.body;
        if (!title || !text || typeof published === 'undefined') {
            return res.status(400).json({
                code: 400,
                success: false,
                message: 'Judul, teks, dan status publikasi wajib diisi.'
            });
        }
        if (!req.file) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: 'Silahkan pilih gambar.'
            });
        }
        const lastArticle = await articles.findOne({
            order: [['id', 'DESC']],
        });
        const newId = lastArticle ? lastArticle.id + 1 : 1;
        const input = {
            id: newId,
            title,
            text,
            image: req.file.filename,
            published,
            createdBy: userId,
        };
        await articles.create(input);
        return res.status(201).json({
            code: 201,
            success: true,
            message: 'Data berhasil disimpan.',
        });
    } catch (err) {
        console.error('Error saat menyimpan data:', err);
        return res.status(500).json({
            code: 500,
            success: false,
            message: err.message || 'Terjadi kesalahan saat menyimpan data.',
        });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.query;
        const { title, text, published } = req.body;
        if (!id) {
            return res.status(400).json({
                code: 400,
                success: false,
                message: 'ID wajib disertakan.',
            });
        }
        if (!title || !text || typeof published === 'undefined') {
            return res.status(400).json({
                code: 400,
                success: false,
                message: 'Judul, teks, dan status publikasi wajib diisi.',
            });
        }
        const input = {
            title,
            text,
            published,
        };
        if (req.file) {
            input.image = req.file.filename;
        }
        const [updated] = await articles.update(input, { where: { id } });
        if (!updated) {
            return res.status(404).json({
                code: 404,
                success: false,
                message: 'Data tidak ditemukan.',
            });
        }
        return res.status(200).json({
            code: 200,
            success: true,
            message: 'Data berhasil diperbarui.',
        });
    } catch (err) {
        console.error('Error saat memperbarui data:', err)
        return res.status(500).json({
            code: 500,
            success: false,
            message: err.message || 'Terjadi kesalahan saat memperbarui data.',
        });
    }
};

exports.delete = (req, res) => {
    const fid_user = req.userid;
    const { id } = req.query;
    articles.destroy({ where: { id: id } })
        .then(data => {
            if (data.length == 0) {
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