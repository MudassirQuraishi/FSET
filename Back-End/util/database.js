const Sequelie = require('sequelize');

const sequelize = new Sequelie ('expense_tracker','root','H3lloworld!',{
    dialect : 'mysql',
    host : 'localhost',
});

module.exports = sequelize;