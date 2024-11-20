const jwt = require('jsonwebtoken');
const db = require("../app/models/index.model");
const User = db.user;
const Admin = db.admin;

exports.tokenValidation = (req, res, next) => {
    let authToken = req.header('token-access');
    console.log(authToken);

    if (!authToken) {
        res.status(203).send({
            code: 203,
            status: false,
            message: "Please insert your Access Token"
        });
        return;
    }
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decript = jwt.decode(authToken, jwtSecretKey);
        const verified = jwt.verify(authToken, jwtSecretKey);
        if (!verified) {
            res.status(203).send({
                code: 203,
                status: false,
                message: 'Your Token not Valid',
            });

        } else {
            const userId = decript.userId;
            console.log(userId);
            User.findAll({
                where: { id: userId, token: authToken }
            }).then(data => {
                if (data.length === 0) {
                    res.status(203).send({
                        code: 203,
                        status: false,
                        message: 'Your account is Expired, Please login again.',
                    });

                } else {
                    // const userType = data[0].fid_user_type;
                    res.locals.userid = userId;
                    req.userid = userId;
                    // req.userType = userType;
                    next();
                }
            })
        }
    } catch (error) {
        res.status(203).send({
            code: 203,
            status: false,
            message: 'Error Token Validation',
            error: error,
        });

    }

}

exports.apiKeyValidation = (req, res, next) => {
    let apiKey = req.header('apiKey');
    let inviteMeApiKey = process.env.API_KEY;

    if (!apiKey) {
        res.status(203).send({
            code: 203,
            status: false,
            message: "You dont have API Key Access!"
        });
        return;
    }

    try {
        if (apiKey !== inviteMeApiKey) {
            res.status(203).send({
                code: 203,
                status: false,
                message: 'Your API KEY not Valid!',
            });
            return;
        }
        next();
    } catch (error) {
        res.status(203).send({
            code: 203,
            status: false,
            message: 'Your API KEY not Valid! 1',
            error: error.message,
        });

    }

}

///////====+========Admin==============
///////====+========Admin==============
///////====+========Admin==============

exports.tokenAdminValidation = (req, res, next) => {
    let authToken = req.header('token-access');
    console.log(authToken);

    if (!authToken) {
        res.status(203).send({
            code: 203,
            status: false,
            message: "Please insert your Access Token"
        });
        return;
    }
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const decript = jwt.decode(authToken, jwtSecretKey);
        const verified = jwt.verify(authToken, jwtSecretKey);
        if (!verified) {
            res.status(203).send({
                code: 203,
                status: false,
                message: 'Your Token not Valid',
            });

        } else {
            const userId = decript.userId;
            console.log(userId);
            Admin.findAll({
                where: { id: userId, token: authToken }
            }).then(data => {
                if (data.length === 0) {
                    res.status(203).send({
                        code: 203,
                        status: false,
                        message: 'Your account is Expired, Please login again.',
                    });

                } else {
                    // const userType = data[0].fid_user_type;
                    res.locals.userid = userId;
                    req.userid = userId;
                    // req.userType = userType;
                    next();
                }
            })
        }
    } catch (error) {
        res.status(203).send({
            code: 203,
            status: false,
            message: 'Error Token Validation',
            error: error,
        });

    }

}
