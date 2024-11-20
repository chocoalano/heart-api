module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        token: { type: Sequelize.TEXT },
        name: { type: Sequelize.STRING },
        gender: { type: Sequelize.STRING },
        religion: { type: Sequelize.STRING },
        birthday: { type: Sequelize.DATE },
        parent_name: { type: Sequelize.STRING },
        photo: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        subdistrict: { type: Sequelize.STRING },
        district: { type: Sequelize.STRING },
        city: { type: Sequelize.STRING },
        province: { type: Sequelize.STRING },
        postal: { type: Sequelize.STRING },
        doctor_name: { type: Sequelize.STRING },
        hospital_name: { type: Sequelize.STRING },
        first_diagnosa: { type: Sequelize.STRING },        
        hipertensi: { type: Sequelize.BOOLEAN },
        diabetes: { type: Sequelize.BOOLEAN },
        hiperkolesterol: { type: Sequelize.BOOLEAN },
        kelainanjantungbawaan: { type: Sequelize.BOOLEAN },
        lain: { type: Sequelize.TEXT },
        published: { type: Sequelize.BOOLEAN },
    });
    return User;
};